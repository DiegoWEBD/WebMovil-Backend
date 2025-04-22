import Store from '../../domain/Store/Store'
import StoreRepository from '../../domain/Store/StoreRepository.interface'

export default class GetStores {
	private storeRepository: StoreRepository

	constructor(storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute(
		name: string | undefined = '',
		page: number | undefined = 1,
		limit: number | undefined = 10
	): Promise<Store[]> {
		const skip = (page - 1) * limit
		return await this.storeRepository.get(name, skip, limit)
	}
}
