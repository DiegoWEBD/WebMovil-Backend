import Store from '../../domain/Store/Store'
import StoreRepository from '../../domain/Store/StoreRepository.interface'

export default class GetStores {
	private storeRepository: StoreRepository

	constructor(storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute(): Promise<Store[]> {
		return await this.storeRepository.getAll()
	}
}
