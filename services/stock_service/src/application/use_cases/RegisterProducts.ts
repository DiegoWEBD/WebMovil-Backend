import Product from '../../domain/Product/Product'
import ProductRepository from '../../domain/Product/ProductRepository.interface'

export default class RegisterProducts {
	private productRepository: ProductRepository

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository
	}

	async execute(products: any[]): Promise<Product[]> {
		const registeredProducts: Product[] = []

		for (const productData of products) {
			const { code, name, description, price, store_id, picture } = productData
			const newProduct = new Product(
				code,
				name,
				description,
				price,
				store_id,
				picture
			)
			await this.productRepository.add(newProduct)
			registeredProducts.push(newProduct)
		}

		return registeredProducts
	}
}
