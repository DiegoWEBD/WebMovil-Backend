import Product from './Product'

export default interface ProductRepository {
	getAll(storeId: string | undefined): Promise<Product[]>
	add(product: Product): Promise<void>
}
