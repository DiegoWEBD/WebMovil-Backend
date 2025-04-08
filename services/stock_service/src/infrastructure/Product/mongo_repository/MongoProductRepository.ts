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
			.then(() => console.log('Base de datos de StockService conectada'))
			.catch(err =>
				console.error(
					'Error al conectar a la base de datos de StockService:',
					err
				)
			)
	}

	async getAll(): Promise<Product[]> {
		const products = await ProductModel.find()
		return products.map(product => new IProductAdapter(product))
	}
	async add(product: Product): Promise<void> {
		const newProduct = new ProductModel({ ...product })
		await newProduct.save()
	}
}
