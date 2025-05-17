import Sale from '../../../domain/sale/Sale'
import SaleModel from '../mongo_repository/SaleModel'

export default class SaleModelAdapter extends SaleModel {
	constructor(sale: Sale) {
		super({
			user_email: sale.getUserEmail(),
			store_id: sale.getStoreId(),
			total: sale.getTotal(),
			date: sale.getDate(),
			details: sale.getDetails().map(detail => ({
				product_code: detail.getProductCode(),
				product_name: detail.getProductName(),
				quantity: detail.getQuantity(),
				unit_price: detail.getUnitPrice(),
			})),
			feedback_id: sale.getFeedbackId(),
		})
	}
}
