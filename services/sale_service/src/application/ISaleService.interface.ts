import NewSaleProductJSON from '../api/types/sale/NewSaleProductJSON'
import Sale from '../domain/temp_name/Sale'
import { SaleSummary } from './types/SaleSummary'

export default interface ISaleService {
	getSale(code: string): Promise<Sale>
	getSales(
		storeId: string | undefined,
		userEmail: string | undefined
	): Promise<SaleSummary[]>
	registerSale(
		user_email: string,
		store_id: string,
		products: NewSaleProductJSON[],
		dispatchMethod: 'delivery' | 'pickup'
	): Promise<Sale>
	createDispatchOrder(saleCode: string): Promise<Sale>
	getCustomerPurchases(userEmail: string): Promise<SaleSummary[]>
}
