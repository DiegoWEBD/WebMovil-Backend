import Store from '../domain/Store/Store'
import StoreRepository from '../domain/Store/StoreRepository.interface'
import IStoreService from './IStoreService.interface'
import ScheduleData from './types/ScheduleData'
import StoreSummary from './types/StoreSummary.interface'
import CountStores from './use_cases/CountStores'
import GetStoreById from './use_cases/GetStoreById'
import GetStores from './use_cases/GetStores'
import GetStoresByOwnerEmail from './use_cases/GetStoresByOwnerEmail'
import RegisterStore from './use_cases/RegisterStore'

export default class StoreService implements IStoreService {
	private _countStores: CountStores
	private _getStores: GetStores
	private _getStoreById: GetStoreById
	private _getStoresByOwnerEmail: GetStoresByOwnerEmail

	private _registerStore: RegisterStore

	constructor(storeRepository: StoreRepository) {
		this._countStores = new CountStores(storeRepository)
		this._getStores = new GetStores(storeRepository)
		this._getStoreById = new GetStoreById(storeRepository)
		this._getStoresByOwnerEmail = new GetStoresByOwnerEmail(storeRepository)
		this._registerStore = new RegisterStore(storeRepository)
	}

	countStores(name: string): Promise<number> {
		return this._countStores.execute(name)
	}

	getStores(
		name: string,
		page: number | undefined = 1,
		limit: number | undefined
	): Promise<StoreSummary[]> {
		return this._getStores.execute(name, page, limit)
	}
	getStoreById(id: string): Promise<Store> {
		return this._getStoreById.execute(id)
	}
	getStoresByOwnerEmail(email: string): Promise<Store[]> {
		return this._getStoresByOwnerEmail.execute(email)
	}

	registerStore(
		name: string,
		description: string,
		about: string,
		direction: string,
		phone: string,
		email: string,
		schedules: ScheduleData[],
		ownerEmail: string,
		imageName: string | undefined
	): Promise<Store> {
		return this._registerStore.execute(
			name,
			description,
			about,
			direction,
			phone,
			email,
			schedules,
			ownerEmail,
			imageName
		)
	}
}
