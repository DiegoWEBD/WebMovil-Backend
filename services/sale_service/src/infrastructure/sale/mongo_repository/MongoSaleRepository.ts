import mongoose from 'mongoose'
import Sale from '../../../domain/sale/Sale'
import SaleRepository from '../../../domain/sale/SaleRepository.interface'
import SaleModelAdapter from '../adapters/SaleModelAdapter'
import SaleModel from './SaleModel'
import ISaleAdapter from '../adapters/ISaleAdapter'

export default class MongoSaleRepository implements SaleRepository {
	constructor() {
		mongoose
			.connect(
				'mongodb://admin:secret@mongodb:27017/sale_service_db?authSource=admin'
			)
			.then(() => console.log('Conectado a la base de datos de SaleService'))
			.catch(err =>
				console.error(
					'Error al conectar a la base de datos de SaleService:',
					err
				)
			)
	}

	async find(storeId: string | undefined): Promise<Sale[]> {
		const sales = storeId
			? await SaleModel.find({ store_id: storeId })
			: await SaleModel.find()
		return sales.map(sale => new ISaleAdapter(sale))
	}

	async findByCode(code: string): Promise<Sale | null> {
		const sale = await SaleModel.findById(code)
		return sale ? new ISaleAdapter(sale) : null
	}

	async add(sale: Sale): Promise<void> {
		const newSale = new SaleModelAdapter(sale)
		await newSale.save()
		sale.setCode(newSale._id.toString())
	}
}
