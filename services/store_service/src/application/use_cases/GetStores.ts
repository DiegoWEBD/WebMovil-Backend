import axios from 'axios'
import StoreRepository from '../../domain/Store/StoreRepository.interface'
import StoreSummaryAdapter from '../../infrastructure/Store/adapters/StoreSummaryAdapter'
import StoreSummary from '../types/StoreSummary.interface'

export default class GetStores {
	private storeRepository: StoreRepository

	constructor(storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute(
		name: string | undefined = '',
		page: number | undefined = 1,
		limit: number | undefined = 10
	): Promise<StoreSummary[]> {
		const skip = (page - 1) * limit
		const stores = await this.storeRepository.get(name, skip, limit)
		const storeSummaries: StoreSummary[] = []

		for (const store of stores) {
			const { data } = await axios.get(
				`http://stock-service:3003?store_id=${store.getId()}`
			)
			const storeSummary = new StoreSummaryAdapter(store)
			storeSummary.setProductsCount(data.length)
			storeSummary.setFeedbackRating(4.5)
			storeSummaries.push(storeSummary)
		}

		return storeSummaries
	}
}
