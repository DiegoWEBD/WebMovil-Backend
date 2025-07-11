import Sale from '../../../domain/Sale/Sale'
import { IDispatch } from '../../Dispatch/DispatchSchema'
import SaleModel from '../mongo_repository/SaleModel'

export default class SaleModelAdapter extends SaleModel {
	constructor(sale: Sale) {
		const saleDispatch = sale.getDispatch()

		const dispatch: IDispatch | undefined = saleDispatch
			? {
					date: saleDispatch.getDate(),
			  }
			: undefined

		super({
			user_email: sale.getUserEmail(),
			user_name: sale.getUserName(),
			store_id: sale.getStoreId(),
			store_name: sale.getStoreName(),
			total: sale.getTotal(),
			date: sale.getDate(),
			feedback_id: sale.getFeedbackId(),
			details: sale.getDetails().map(detail => ({
				product_code: detail.getProductCode(),
				product_name: detail.getProductName(),
				quantity: detail.getQuantity(),
				unit_price: detail.getUnitPrice(),
			})),
			dispatch_method_id: sale.getDispatchMethod()?.id,
			dispatch_order_id: sale.getDispatchOrder()?.getId(),
			dispatch,
			delivery_details: sale.getDeliveryDetails()
				? {
						delivery_man_email: sale
							.getDeliveryDetails()!
							.getDeliveryManEmail(),
				  }
				: undefined,
			status: sale.getStatus(),
		})
	}
}
