import Product from '../../../domain/Product/Product'
import ProductModel from '../mongo_repository/ProductModel'

export default class ProductModelAdapter extends ProductModel {
	constructor(product: Product) {
		super({
			code: product.getCode(),
			name: product.getName(),
			description: product.getDescription(),
			price: product.getPrice(),
			store_id: product.getStoreId(),
			picture: product.getPicture(),
			stock: product.getStock(),
		})
	}
}
