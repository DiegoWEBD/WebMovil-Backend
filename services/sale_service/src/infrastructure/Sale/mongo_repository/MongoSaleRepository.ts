import mongoose from 'mongoose'
import DeliveryData from '../../../domain/DispatchMethod/DeliveryData/DeliveryData'
import PickupData from '../../../domain/DispatchMethod/PickupData/PickupData'
import DeliveryOrder from '../../../domain/DispatchOrder/DeliveryOrder'
import PickupOrder from '../../../domain/DispatchOrder/PickupOrder'
import Sale from '../../../domain/Sale/Sale'
import SaleRepository from '../../../domain/Sale/SaleRepository.interface'
import DeliveryDataModel, {
	IDeliveryData,
} from '../../DispatchMethod/DeliveryData/DeliveryDataModel'
import PickupDataModel, {
	IPickupData,
} from '../../DispatchMethod/PickupData/PickupDataModel'
import DeliveryOrderModel, {
	IDeliveryOrder,
} from '../../DispatchOrder/DeliveryOrderModel'
import PickupOrderModel, {
	IPickupOrder,
} from '../../DispatchOrder/PickupOrderModel'
import ISaleAdapter from '../adapters/ISaleAdapter'
import SaleModelAdapter from '../adapters/SaleModelAdapter'
import SaleModel from './SaleModel'

export default class MongoSaleRepository implements SaleRepository {
	constructor() {
		mongoose
			.connect(
				'mongodb://admin:secret@mongodb:27017/sale_service_db?authSource=admin'
			)
			.then(() => console.log('Conectado a la base de datos de SaleService'))
			.catch(err =>
				console.error(
					'Error al conectar a la base de datos de SaleService:',
					err
				)
			)
	}

	async find(
		storeId: string | undefined,
		userEmail: string | undefined,
		status: string | undefined
	): Promise<Sale[]> {
		const sales = await SaleModel.find({
			store_id: storeId ? storeId : { $exists: true },
			user_email: userEmail ? userEmail : { $exists: true },
			status: status ? status : { $exists: true },
		}).sort({ _id: -1 })

		// Load each sale with its dispatch method and dispatch order
		const adaptedSales: Sale[] = []
		for (const sale of sales) {
			const adaptedSale = new ISaleAdapter(sale)

			// Load dispatch method
			let dispatchMethod: IDeliveryData | IPickupData | null =
				await DeliveryDataModel.findById(sale.dispatch_method_id)

			if (dispatchMethod) {
				const deliveryData = dispatchMethod as IDeliveryData
				adaptedSale.setDispatchMethod(
					new DeliveryData(
						deliveryData._id.toString(),
						deliveryData.street,
						deliveryData.number,
						deliveryData.customer_instructions
					)
				)
			} else {
				dispatchMethod = await PickupDataModel.findById(sale.dispatch_method_id)

				if (dispatchMethod) {
					const pickupData = dispatchMethod as IPickupData
					adaptedSale.setDispatchMethod(
						new PickupData(
							pickupData._id.toString(),
							pickupData.store_direction
						)
					)
				}
			}

			// Load dispatch order if it exists
			if (sale.dispatch_order_id) {
				let deliveryOrder = await DeliveryOrderModel.findById(
					sale.dispatch_order_id
				)

				if (deliveryOrder) {
					adaptedSale.setDispatchOrder(
						new DeliveryOrder(
							deliveryOrder._id.toString(),
							deliveryOrder.street,
							deliveryOrder.number,
							deliveryOrder.customer_instructions
						)
					)
				} else {
					const pickupOrder = await PickupOrderModel.findById(
						sale.dispatch_order_id
					)

					if (pickupOrder) {
						adaptedSale.setDispatchOrder(
							new PickupOrder(
								pickupOrder._id.toString(),
								pickupOrder.store_direction
							)
						)
					}
				}
			}

			adaptedSales.push(adaptedSale)
		}

		return adaptedSales
	}

	async findByCode(code: string): Promise<Sale | null> {
		const sale = await SaleModel.findById(code)

		if (!sale) return null

		const adaptedSale = new ISaleAdapter(sale)

		let dispatchMethod: IDeliveryData | IPickupData | null =
			await DeliveryDataModel.findById(sale.dispatch_method_id)

		if (dispatchMethod) {
			const deliveryData = dispatchMethod as IDeliveryData
			adaptedSale.setDispatchMethod(
				new DeliveryData(
					deliveryData._id.toString(),
					deliveryData.street,
					deliveryData.number,
					deliveryData.customer_instructions
				)
			)
		} else {
			dispatchMethod = await PickupDataModel.findById(sale.dispatch_method_id)

			if (dispatchMethod) {
				const pickupData = dispatchMethod as IPickupData
				adaptedSale.setDispatchMethod(
					new PickupData(pickupData._id.toString(), pickupData.store_direction)
				)
			}
		}

		// Load dispatch order if it exists
		if (sale.dispatch_order_id) {
			let deliveryOrder = await DeliveryOrderModel.findById(
				sale.dispatch_order_id
			)

			if (deliveryOrder) {
				adaptedSale.setDispatchOrder(
					new DeliveryOrder(
						deliveryOrder._id.toString(),
						deliveryOrder.street,
						deliveryOrder.number,
						deliveryOrder.customer_instructions
					)
				)
			} else {
				const pickupOrder = await PickupOrderModel.findById(
					sale.dispatch_order_id
				)

				if (pickupOrder) {
					adaptedSale.setDispatchOrder(
						new PickupOrder(
							pickupOrder._id.toString(),
							pickupOrder.store_direction
						)
					)
				}
			}
		}

		return adaptedSale
	}

	async add(sale: Sale): Promise<void> {
		if (sale.getDispatchMethod()!.type === 'delivery') {
			const dispatchMethod = sale.getDispatchMethod() as DeliveryData
			const deliveryData = await DeliveryDataModel.create({
				street: dispatchMethod.getStreet(),
				number: dispatchMethod.getNumber(),
				customer_instructions: dispatchMethod.getCustomerInstructions(),
			})

			dispatchMethod.id = deliveryData._id.toString()
			sale.setDispatchMethod(dispatchMethod)
		} else {
			const dispatchMethod = sale.getDispatchMethod() as PickupData
			const pickupData = await PickupDataModel.create({
				store_direction: dispatchMethod.getStoreDirection(),
			})

			dispatchMethod.id = pickupData._id.toString()
			sale.setDispatchMethod(dispatchMethod)
		}
		const newSale = new SaleModelAdapter(sale)
		await newSale.save()
		sale.setCode(newSale._id.toString())
	}

	async updateSale(code: string, values: Sale): Promise<void> {
		const sale = await SaleModel.findById(code)
		if (!sale) return

		const dispatchOrder = values.getDispatchOrder()
		if (dispatchOrder && !sale.dispatch_order_id) {
			if (dispatchOrder instanceof DeliveryOrder) {
				const deliveryOrderModel = await DeliveryOrderModel.create({
					street: dispatchOrder.getStreet(),
					number: dispatchOrder.getNumber(),
					customer_instructions: dispatchOrder.getCustomerInstructions(),
				})
				dispatchOrder.setId(deliveryOrderModel._id.toString())
				sale.set({ status: 'Buscando repartidor' })
			} else if (dispatchOrder instanceof PickupOrder) {
				const pickupOrderModel = await PickupOrderModel.create({
					store_direction: dispatchOrder.getStoreDirection(),
				})
				dispatchOrder.setId(pickupOrderModel._id.toString())
				sale.set({ status: 'Lista para retiro' })
			}
			sale.set({
				dispatch_order_id: dispatchOrder?.getId(),
			})
		}

		const dispatch = values.getDispatch()
		if (dispatch && !sale.dispatch) {
			sale.dispatch = {
				date: dispatch.getDate(),
			}
			sale.set({ status: 'Completada' })
		}

		const deliveryDetails = values.getDeliveryDetails()
		if (deliveryDetails && !sale.delivery_details) {
			sale.set({ delivery_details: deliveryDetails, status: 'En camino' })
		}

		await sale.save()
	}
}
