import Store from '../../domain/Store/Store'
import StoreRepository from '../../domain/Store/StoreRepository.interface'

export default class GetStoresByOwnerEmail {
	private storeRepository: StoreRepository

	constructor(storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute(email: string): Promise<Store[]> {
		return await this.storeRepository.getByOwnerEmail(email)
	}
}
