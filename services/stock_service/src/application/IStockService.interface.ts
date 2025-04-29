import Product from '../domain/Product/Product'

export default interface IStockService {
	getProducts(storeId: string | undefined): Promise<Product[]>
	registerProduct(
		code: string,
		name: string,
		description: string,
		price: number,
		storeId: string,
		picture: string
	): Promise<Product>
	registerProducts(products: any[]): Promise<Product[]>
}
