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

	async getProducts(storeId: string | undefined): Promise<Product[]> {
		return await this._getProducts.execute(storeId)
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
}
