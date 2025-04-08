import Product from './Product'

export default interface ProductRepository {
	getAll(): Promise<Product[]>
	add(product: Product): Promise<void>
}
