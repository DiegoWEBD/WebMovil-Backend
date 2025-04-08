import Product from '../domain/Product/Product'
import ProductRepository from '../domain/Product/ProductRepository.interface'
import GetProducts from './use_cases/GetProducts'
import RegisterProduct from './use_cases/RegisterProduct'

export default class StockService {
	private productRepository: ProductRepository

	private _getProducts: GetProducts
	private _registerProduct: RegisterProduct

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository
		this._getProducts = new GetProducts(this.productRepository)
		this._registerProduct = new RegisterProduct(this.productRepository)
	}

	async getProducts(): Promise<Product[]> {
		return await this._getProducts.execute()
	}

	async registerProduct(
		code: string,
		name: string,
		description: string,
		price: number,
		storeId: number
	): Promise<Product> {
		return await this._registerProduct.execute(
			code,
			name,
			description,
			price,
			storeId
		)
	}
}
