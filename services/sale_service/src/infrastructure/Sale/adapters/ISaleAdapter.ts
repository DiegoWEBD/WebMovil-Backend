import Dispatch from '../../../domain/Dispatch/Dispatch'
import Sale from '../../../domain/Sale/Sale'
import SaleDetail from '../../../domain/SaleDetail/SaleDetail'
import { ISale } from '../mongo_repository/SaleModel'

export default class ISaleAdapter extends Sale {
	constructor(saleI: ISale) {
		const dispatch = saleI.dispatch
			? new Dispatch(saleI.dispatch.date)
			: undefined

		super(
			saleI._id.toString(),
			saleI.user_email,
			saleI.user_name,
			saleI.store_id,
			saleI.store_name,
			saleI.total,
			saleI.date,
			saleI.feedback_id,
			saleI.details.map(
				detail =>
					new SaleDetail(
						detail.product_code,
						detail.product_name,
						detail.quantity,
						detail.unit_price
					)
			),
			undefined,
			undefined,
			dispatch
		)
	}
}
