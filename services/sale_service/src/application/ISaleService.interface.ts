import DeliveryDataJSON from '../api/types/DispatchMethod/DeliveryDataJSON'
import PickupDataJSON from '../api/types/DispatchMethod/PickupDataJSON'
import NewSaleProductJSON from '../api/types/sale/NewSaleProductJSON'
import Sale from '../domain/Sale/Sale'
import { SaleSummary } from './types/SaleSummary'

export default interface ISaleService {
	getSale(code: string): Promise<Sale>
	getSales(
		storeId: string | undefined,
		userEmail: string | undefined,
		status: string | undefined
	): Promise<SaleSummary[]>
	registerSale(
		user_email: string,
		store_id: string,
		products: NewSaleProductJSON[],
		dispatchMethod: DeliveryDataJSON | PickupDataJSON
	): Promise<Sale>
	createDispatchOrder(saleCode: string): Promise<Sale>
	createDispatch(saleCode: string): Promise<Sale>
	getCustomerPurchases(userEmail: string): Promise<SaleSummary[]>
	acceptDelivery(saleCode: string, deliveryManEmail: string): Promise<Sale>
}
