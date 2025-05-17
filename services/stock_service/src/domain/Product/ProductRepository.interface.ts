import Product from './Product'

export default interface ProductRepository {
	findByCode(
		code: string,
		storeId: string | undefined
	): Promise<Product | Product[]>
	getAll(storeId: string | undefined): Promise<Product[]>
	add(product: Product): Promise<void>
}
