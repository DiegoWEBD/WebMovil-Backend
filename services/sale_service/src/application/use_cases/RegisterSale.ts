import serviceClient from '../../api/axios/service_client'
import NewSaleProductJSON from '../../api/types/sale/NewSaleProductJSON'
import Sale from '../../domain/sale/Sale'
import SaleRepository from '../../domain/sale/SaleRepository.interface'
import SaleDetail from '../../domain/sale_detail/SaleDetail'

export default class RegisterSale {
	private saleRepository: SaleRepository

	constructor(saleRepository: SaleRepository) {
		this.saleRepository = saleRepository
	}

	async execute(
		user_email: string,
		store_id: string,
		products: NewSaleProductJSON[]
	): Promise<Sale> {
		// validate user
		await serviceClient.get(`${process.env.USER_SERVICE_URL}/${user_email}`)

		// validate store
		await serviceClient.get(`${process.env.STORE_SERVICE_URL}/${store_id}`)

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
            TODO: subtract stock
            */

			saleDetails.push(
				new SaleDetail(product.code, data.name, product.quantity, data.price)
			)
			total += data.price * product.quantity
		}

		const sale = new Sale(
			undefined,
			user_email,
			store_id,
			total,
			new Date(),
			saleDetails,
			undefined
		)
		await this.saleRepository.add(sale)
		return sale
	}
}
