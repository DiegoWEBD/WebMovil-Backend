import Product from '../../domain/Product/Product'
import ProductRepository from '../../domain/Product/ProductRepository.interface'

export default class GetProducts {
	private productRepository: ProductRepository

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository
	}

	async execute(storeId: string | undefined): Promise<Product[]> {
		return await this.productRepository.getAll(storeId)
	}
}
