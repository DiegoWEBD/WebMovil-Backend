import StoreRepository from '../../domain/Store/StoreRepository.interface'

export default class CountStores {
	private storeRepository: StoreRepository

	constructor(storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute(): Promise<number> {
		return await this.storeRepository.count()
	}
}
