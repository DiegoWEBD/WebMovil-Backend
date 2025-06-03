import NewSaleProductJSON from '../api/types/sale/NewSaleProductJSON'
import Sale from '../domain/sale/Sale'

export default interface ISaleService {
	getSale(code: string): Promise<Sale>
	getSales(storeId: string | undefined): Promise<Sale[]>
	registerSale(
		user_email: string,
		store_id: string,
		products: NewSaleProductJSON[]
	): Promise<Sale>
}
