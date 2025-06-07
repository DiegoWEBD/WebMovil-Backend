import Product from '../domain/Product/Product'

export default interface IStockService {
	getProduct(
		code: string,
		storeId: string | undefined
	): Promise<Product | Product[]>
	getProducts(
		storeId: string | undefined,
		productName: string | undefined,
		page: number | undefined,
		limit: number | undefined
	): Promise<Product[]>
	registerProduct(
		code: string,
		name: string,
		description: string,
		price: number,
		storeId: string,
		storeName: string,
		picture: string,
		stock: string
	): Promise<Product>

	countProducts(
		storeId: string | undefined,
		productName: string | undefined
	): Promise<number>
}
