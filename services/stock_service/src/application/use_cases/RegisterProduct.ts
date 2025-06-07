import Product from '../../domain/Product/Product'
import ProductRepository from '../../domain/Product/ProductRepository.interface'

export default class RegisterProduct {
	private productRepository: ProductRepository

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository
	}

	async execute(
		code: string,
		name: string,
		description: string,
		price: number,
		storeId: string,
		storeName: string,
		picture: string,
		stock: string
	): Promise<Product> {
		const newProduct = new Product(
			code,
			name,
			description,
			price,
			storeId,
			storeName,
			picture,
			stock
		)
		await this.productRepository.add(newProduct)
		return newProduct
	}
}
