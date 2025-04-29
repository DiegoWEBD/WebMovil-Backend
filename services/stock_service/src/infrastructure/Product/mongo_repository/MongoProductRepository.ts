import mongoose from 'mongoose'
import Product from '../../../domain/Product/Product'
import ProductRepository from '../../../domain/Product/ProductRepository.interface'
import ProductModel from './ProductModel'
import IProductAdapter from '../adapters/IProductAdapter'

export default class MongoProductRepository implements ProductRepository {
	constructor() {
		mongoose
			.connect(
				'mongodb://admin:secret@mongodb:27017/stock_service_db?authSource=admin'
			)
			.then(async () => {
				console.log('Conectado a la base de datos de StockService')
			})
			.catch(err =>
				console.error(
					'Error al conectar a la base de datos de StockService:',
					err
				)
			)
	}

	async getAll(storeId: string | undefined): Promise<Product[]> {
		const query = storeId ? { store_id: storeId } : {}
		const products = await ProductModel.find(query)
		return products.map(product => new IProductAdapter(product))
	}
	async add(product: Product): Promise<void> {
		const newProduct = new ProductModel({ ...product })
		await newProduct.save()
	}
}
