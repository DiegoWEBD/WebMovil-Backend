import Product from './Product'

export default interface ProductRepository {
	findByCode(
		code: string,
		storeId: string | undefined
	): Promise<Product | Product[]>
	getAll(
		storeId: string | undefined,
		productName: string | undefined,
		skip: number | undefined,
		limit: number | undefined
	): Promise<Product[]>
	add(product: Product): Promise<void>
	count(storeId: string, productName: string): Promise<number>
}
