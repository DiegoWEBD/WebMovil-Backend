import mongoose from 'mongoose'
import Product from '../../../domain/Product/Product'
import ProductRepository from '../../../domain/Product/ProductRepository.interface'
import IProductAdapter from '../adapters/IProductAdapter'
import ProductModelAdapter from '../adapters/ProductModelAdapter'
import ProductModel from './ProductModel'
import { loadFakeProducts } from './load_fake_products'

export default class MongoProductRepository implements ProductRepository {
	constructor() {
		mongoose
			.connect(
				'mongodb://admin:secret@mongodb:27017/stock_service_db?authSource=admin'
			)
			.then(async () => {
				console.log('Conectado a la base de datos de StockService')
				//await loadFakeProducts()
			})
			.catch(err =>
				console.error(
					'Error al conectar a la base de datos de StockService:',
					err
				)
			)
	}

	async count(storeId: string, productName: string): Promise<number> {
		const regex = new RegExp(productName, 'i')
		return await ProductModel.find({
			store_id: { $regex: new RegExp(storeId, 'i') },
			name: { $regex: regex },
		}).countDocuments()
	}

	async findByCode(
		code: string,
		storeId: string | undefined
	): Promise<Product | Product[]> {
		const query = storeId ? { code, store_id: storeId } : { code }

		if (storeId) {
			const product = await ProductModel.findOne({ code, store_id: storeId })

			if (!product) {
				throw new Error(`La tienda ${storeId} no vende el producto ${code}`)
			}

			return new IProductAdapter(product)
		}

		const products = await ProductModel.find(query)
		return products.map(product => new IProductAdapter(product))
	}

	async getAll(
		storeId: string | undefined,
		productName: string,
		skip: number,
		limit: number
	): Promise<Product[]> {
		const query = storeId ? { store_id: storeId } : {}
		const regex = new RegExp(productName, 'i')
		const products = await ProductModel.find({
			...query,
			name: { $regex: regex },
		})
			.skip(skip)
			.limit(limit)
		return products.map(product => new IProductAdapter(product))
	}
	async add(product: Product): Promise<void> {
		const newProduct = new ProductModelAdapter(product)
		await newProduct.save()
	}
}
