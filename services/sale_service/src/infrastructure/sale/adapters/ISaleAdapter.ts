import Sale from '../../../domain/sale/Sale'
import SaleDetail from '../../../domain/sale_detail/SaleDetail'
import { ISale } from '../mongo_repository/SaleModel'

export default class ISaleAdapter extends Sale {
	constructor(saleI: ISale) {
		super(
			saleI._id.toString(),
			saleI.user_email,
			saleI.user_name,
			saleI.store_id,
			saleI.total,
			saleI.date,
			saleI.details.map(
				detail =>
					new SaleDetail(
						detail.product_code,
						detail.product_name,
						detail.quantity,
						detail.unit_price
					)
			),
			saleI.feedback_id
		)
	}
}
