import Product from '../../../domain/Product/Product'
import { IProduct } from '../mongo_repository/ProductModel'

export default class IProductAdapter extends Product {
	constructor(productI: IProduct) {
		super(
			productI.code,
			productI.name,
			productI.description,
			productI.price,
			productI.store_id,
			productI.picture,
			productI.stock
		)
	}
}
