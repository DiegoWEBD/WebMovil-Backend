import StoreRepository from '../../domain/Store/StoreRepository.interface'
import serviceClient from '../../infrastructure/axios/service_client'
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
			const { data } = await serviceClient.get(
				`/stock-service:3003?store_id=${store.getId()}&limit=10000`
			)

			const storeSummary = new StoreSummaryAdapter(store)
			storeSummary.setProductsCount(data.products.length)
			storeSummary.setFeedbackRating(4.5)
			storeSummaries.push(storeSummary)
		}

		return storeSummaries
	}
}
