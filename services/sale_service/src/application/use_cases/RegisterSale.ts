import serviceClient from '../../api/axios/service_client'
import DeliveryDataJSON from '../../api/types/DispatchMethod/DeliveryDataJSON'
import PickupDataJSON from '../../api/types/DispatchMethod/PickupDataJSON'
import NewSaleProductJSON from '../../api/types/sale/NewSaleProductJSON'
import DeliveryData from '../../domain/DispatchMethod/DeliveryData/DeliveryData'
import PickupData from '../../domain/DispatchMethod/PickupData/PickupData'
import Sale from '../../domain/Sale/Sale'
import SaleRepository from '../../domain/Sale/SaleRepository.interface'
import SaleDetail from '../../domain/SaleDetail/SaleDetail'

export default class RegisterSale {
	private saleRepository: SaleRepository

	constructor(saleRepository: SaleRepository) {
		this.saleRepository = saleRepository
	}

	async execute(
		user_email: string,
		store_id: string,
		products: NewSaleProductJSON[],
		dispatchMethodData: DeliveryDataJSON | PickupDataJSON
	): Promise<Sale> {
		// validate user
		const userResponse = await serviceClient.get(
			`${process.env.USER_SERVICE_URL}/${user_email}`
		)

		// validate store
		const { data: store } = await serviceClient.get(
			`${process.env.STORE_SERVICE_URL}/${store_id}`
		)

		// process products
		let total = 0
		const saleDetails: SaleDetail[] = []

		for (const product of products) {
			// validate and get product
			const { data } = await serviceClient.get(
				`${process.env.STOCK_SERVICE_URL}/${product.code}?store_id=${store_id}`
			)
			const stock = data.stock

			if (stock < product.quantity) {
				throw new Error(
					`La tienda ${store_id} no tiene suficiente stock del producto ${product.code}`
				)
			}

			/*
            TODO: Restar stock
            */

			saleDetails.push(
				new SaleDetail(product.code, data.name, product.quantity, data.price)
			)
			total += data.price * product.quantity
		}

		let dispatchMethod: DeliveryData | PickupData

		if (dispatchMethodData.type === 'delivery') {
			const deliveryDataJSON = dispatchMethodData as DeliveryDataJSON

			dispatchMethod = new DeliveryData(
				undefined,
				deliveryDataJSON.street,
				deliveryDataJSON.number,
				deliveryDataJSON.customer_instructions
			)
		} else {
			const pickupDataJSON = dispatchMethodData as PickupDataJSON

			dispatchMethod = new PickupData(undefined, pickupDataJSON.store_direction)
		}

		const sale = new Sale(
			undefined,
			user_email,
			userResponse.data.full_name,
			store_id,
			store.name,
			total,
			new Date(),
			undefined,
			saleDetails,
			dispatchMethod,
			undefined,
			undefined,
			undefined,
			'Pendiente'
		)
		await this.saleRepository.add(sale)
		return sale
	}
}
