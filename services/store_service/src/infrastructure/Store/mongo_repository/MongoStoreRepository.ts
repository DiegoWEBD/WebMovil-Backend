import mongoose from 'mongoose'
import StoreRepository from '../../../domain/Store/StoreRepository.interface'
import Store from '../../../domain/Store/Store'
import StoreModelAdapter from '../adapters/StoreModelAdapter'
import IStoreAdapter from '../adapters/IStoreAdapter'
import StoreModel, { IStore } from './StoreModel'
import OwnerStoreSummary from '../../../application/types/OwnerStoreSummary'
import OwnerStoreSummaryAdapter from '../adapters/OwnerStoreSummaryAdapter'
import { loadFakeStores } from './load_fake_stores'

export default class MongoStoreRepository implements StoreRepository {
	constructor() {
		mongoose
			.connect(
				'mongodb://admin:secret@mongodb:27017/store_service_db?authSource=admin'
			)
			.then(async () => {
				console.log('Base de datos de StoreService conectada')
				await loadFakeStores()
			})
			.catch(err =>
				console.error(
					'Error al conectar a la base de datos de StoreService:',
					err
				)
			)
	}

	async count(name: string): Promise<number> {
		const regex = new RegExp(name, 'i')
		return await StoreModel.find({ name: { $regex: regex } }).countDocuments()
	}

	async add(store: Store): Promise<void> {
		const newStore = new StoreModelAdapter(store)
		await newStore.save()
		store.setId(newStore._id.toString())
	}

	async get(name: string, skip: number, limit: number): Promise<Store[]> {
		const regex = new RegExp(name, 'i')
		const stores = await StoreModel.find({ name: { $regex: regex } })
			.skip(skip)
			.limit(limit)
		return stores.map(store => new IStoreAdapter(store))
	}

	async getById(id: string): Promise<Store | null> {
		const store = await StoreModel.findOne({ _id: id })
		return store ? new IStoreAdapter(store) : null
	}

	async getByOwnerEmail(email: string): Promise<OwnerStoreSummary[]> {
		const stores: IStore[] = await StoreModel.find({ owners_emails: email })
		return stores.map(store => new OwnerStoreSummaryAdapter(store))
	}

	// revisar
	async findByName(name: string): Promise<Store | null> {
		const store = await StoreModel.findOne({ name })
		return store ? new IStoreAdapter(store) : null
	}
}
