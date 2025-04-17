import Store from '../domain/Store/Store'
import StoreRepository from '../domain/Store/StoreRepository.interface'
import IStoreService from './IStoreService.interface'
import CountStores from './use_cases/CountStores'
import FindStoresByName from './use_cases/FindStoresByName'
import GetStoreById from './use_cases/GetStoreById'
import GetStores from './use_cases/GetStores'
import GetStoresByOwnerEmail from './use_cases/GetStoresByOwnerEmail'
import RegisterStore from './use_cases/RegisterStore'

export default class StoreService implements IStoreService {
	private _countStores: CountStores
	private _getStores: GetStores
	private _getStoreById: GetStoreById
	private _getStoresByOwnerEmail: GetStoresByOwnerEmail
	private _findStoresByName: FindStoresByName
	private _registerStore: RegisterStore

	constructor(storeRepository: StoreRepository) {
		this._countStores = new CountStores(storeRepository)
		this._getStores = new GetStores(storeRepository)
		this._getStoreById = new GetStoreById(storeRepository)
		this._getStoresByOwnerEmail = new GetStoresByOwnerEmail(storeRepository)
		this._findStoresByName = new FindStoresByName(storeRepository)
		this._registerStore = new RegisterStore(storeRepository)
	}

	countStores(): Promise<number> {
		return this._countStores.execute()
	}

	getStores(
		page: number | undefined = 1,
		limit: number | undefined
	): Promise<Store[] | null> {
		return this._getStores.execute(page, limit)
	}
	getStoreById(id: string): Promise<Store> {
		return this._getStoreById.execute(id)
	}
	getStoresByOwnerEmail(email: string): Promise<Store[]> {
		return this._getStoresByOwnerEmail.execute(email)
	}
	findStoresByName(name: string): Promise<Store[]> {
		return this._findStoresByName.execute(name)
	}
	registerStore(
		name: string,
		description: string,
		direction: string,
		phone: string,
		ownerEmail: string
	): Promise<Store> {
		return this._registerStore.execute(
			name,
			description,
			direction,
			phone,
			ownerEmail
		)
	}
}
