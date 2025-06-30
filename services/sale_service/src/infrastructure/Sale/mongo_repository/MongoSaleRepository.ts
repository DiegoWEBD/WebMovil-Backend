import mongoose from 'mongoose'
import DeliveryData from '../../../domain/DispatchMethod/DeliveryData/DeliveryData'
import PickupData from '../../../domain/DispatchMethod/PickupData/PickupData'
import Sale from '../../../domain/Sale/Sale'
import SaleRepository from '../../../domain/Sale/SaleRepository.interface'
import DeliveryDataModel, {
	IDeliveryData,
} from '../../DispatchMethod/DeliveryData/DeliveryDataModel'
import PickupDataModel, {
	IPickupData,
} from '../../DispatchMethod/PickupData/PickupDataModel'
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
		userEmail: string | undefined
	): Promise<Sale[]> {
		const sales = await SaleModel.find({
			store_id: storeId ? storeId : { $exists: true },
			user_email: userEmail ? userEmail : { $exists: true },
		})
		return sales.map(sale => new ISaleAdapter(sale))
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

		sale.set(new SaleModelAdapter(values))
		await sale.save()
	}
}
