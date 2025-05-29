import axios from 'axios'
import Product from '../domain/Product/Product'
import ProductRepository from '../domain/Product/ProductRepository.interface'
import IStockService from './IStockService.interface'
import GetProducts from './use_cases/GetProducts'
import RegisterProduct from './use_cases/RegisterProduct'
import RegisterProducts from './use_cases/RegisterProducts'

export default class StockService implements IStockService {
	private productRepository: ProductRepository

	private _getProducts: GetProducts
	private _registerProduct: RegisterProduct
	private _registerProducts: RegisterProducts

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository
		this._getProducts = new GetProducts(this.productRepository)
		this._registerProduct = new RegisterProduct(this.productRepository)
		this._registerProducts = new RegisterProducts(this.productRepository)
	}

	async getProduct(
		code: string,
		storeId: string | undefined
	): Promise<Product | Product[]> {
		// validate store
		if (storeId) {
			const { data } = await axios.post(
				`${process.env.TOKEN_SERVICE_URL}/token`,
				{
					grant_type: 'client_credentials',
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
				}
			)
			await axios.get(`${process.env.STORE_SERVICE_URL}/${storeId}`, {
				headers: {
					'x-service-authorization': `${data.token_type} ${data.access_token}`,
				},
			})
		}

		return await this.productRepository.findByCode(code, storeId)
	}

	async getProducts(
		storeId: string | undefined,
		productName: string | undefined,
		page: number | undefined,
		limit: number | undefined
	): Promise<Product[]> {
		return await this._getProducts.execute(storeId, productName, page, limit)
	}

	async registerProduct(
		code: string,
		name: string,
		description: string,
		price: number,
		storeId: string,
		picture: string,
		stock: string
	): Promise<Product> {
		return await this._registerProduct.execute(
			code,
			name,
			description,
			price,
			storeId,
			picture,
			stock
		)
	}

	async registerProducts(products: any): Promise<Product[]> {
		return await this._registerProducts.execute(products)
	}

	async countProducts(
		storeId: string | undefined = '',
		productName: string | undefined = ''
	): Promise<number> {
		return await this.productRepository.count(storeId, productName)
	}
}
