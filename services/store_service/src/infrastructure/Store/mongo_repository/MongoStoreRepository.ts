import mongoose from 'mongoose'
import StoreRepository from '../../../domain/Store/StoreRepository.interface'
import Store from '../../../domain/Store/Store'
import StoreModelAdapter from '../adapters/StoreModelAdapter'
import IStoreAdapter from '../adapters/IStoreAdapter'
import StoreModel from './StoreModel'

export default class MongoStoreRepository implements StoreRepository {
	constructor() {
		mongoose
			.connect(
				'mongodb://admin:secret@mongodb:27017/store_service_db?authSource=admin'
			)
			.then(() => console.log('Base de datos de StoreService conectada'))
			.catch(err =>
				console.error(
					'Error al conectar a la base de datos de StoreService:',
					err
				)
			)
	}

	async count(): Promise<number> {
		return await StoreModel.countDocuments()
	}

	async add(store: Store): Promise<void> {
		const newStore = new StoreModelAdapter(store)
		await newStore.save()
		store.setId(newStore._id.toString())
	}

	async get(skip: number, limit: number): Promise<Store[]> {
		const stores = await StoreModel.find().skip(skip).limit(limit)
		return stores.map(store => new IStoreAdapter(store))
	}

	async getById(id: string): Promise<Store | null> {
		const store = await StoreModel.findOne({ _id: id })
		return store ? new IStoreAdapter(store) : null
	}

	async getByOwnerEmail(email: string): Promise<Store[]> {
		const stores = await StoreModel.find({ owners_emails: email })
		return stores.map(store => new IStoreAdapter(store))
	}

	// revisar
	async findByName(name: string): Promise<Store[]> {
		/*const stores = await StoreModel.find({ name })
		return stores.map(store => new IStoreAdapter(store))*/

		const regex = new RegExp(name, 'i')
		const stores = await StoreModel.find({ name: { $regex: regex } })
		return stores.map(store => new IStoreAdapter(store))
	}
}
