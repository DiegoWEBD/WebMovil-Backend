import mongoose from 'mongoose'
import Sale from '../../../domain/temp_name/Sale'
import ISaleAdapter from '../adapters/ISaleAdapter'
import SaleModelAdapter from '../adapters/SaleModelAdapter'
import SaleModel from './SaleModel'
import SaleRepository from '../../../domain/temp_name/SaleRepository.interface'

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

	async find(
		storeId: string | undefined,
		userEmail: string | undefined
	): Promise<Sale[]> {
		const sales = await SaleModel.find({
			store_id: storeId ? storeId : { $exists: true },
			user_email: userEmail ? userEmail : { $exists: true },
		})
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

	async updateSale(code: string, values: Sale): Promise<void> {
		const sale = await SaleModel.findById(code)
		if (!sale) return

		sale.set(new SaleModelAdapter(values))
		await sale.save()
	}
}
