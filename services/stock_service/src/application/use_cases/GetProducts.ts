import Product from '../../domain/Product/Product'
import ProductRepository from '../../domain/Product/ProductRepository.interface'

export default class GetProducts {
	private productRepository: ProductRepository

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository
	}

	async execute(
		storeId: string | undefined,
		productName: string | undefined = '',
		page: number | undefined = 1,
		limit: number | undefined = 10
	): Promise<Product[]> {
		const skip = (page - 1) * limit
		return await this.productRepository.getAll(
			storeId,
			productName,
			skip,
			limit
		)
	}
}
