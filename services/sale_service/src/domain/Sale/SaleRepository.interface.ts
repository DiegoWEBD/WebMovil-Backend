import Sale from './Sale'

export default interface SaleRepository {
	find(
		storeId: string | undefined,
		userEmail: string | undefined,
		status: string | undefined
	): Promise<Sale[]>
	findByCode(code: string): Promise<Sale | null>
	add(sale: Sale): Promise<void>
	updateSale(code: string, values: Sale): Promise<void>
}
