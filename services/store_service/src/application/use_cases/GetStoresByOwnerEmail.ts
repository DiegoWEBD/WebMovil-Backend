import StoreRepository from '../../domain/Store/StoreRepository.interface'
import OwnerStoreSummary from '../types/OwnerStoreSummary'

export default class GetStoresByOwnerEmail {
	private storeRepository: StoreRepository

	constructor(storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute(email: string): Promise<OwnerStoreSummary[]> {
		return await this.storeRepository.getByOwnerEmail(email)
	}
}
