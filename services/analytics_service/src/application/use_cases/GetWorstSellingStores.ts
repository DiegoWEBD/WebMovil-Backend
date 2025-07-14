import IAnalyticsService from '../IAnalyticsService.interface'
import StoreAnalytics from '../../domain/StoreAnalytics'

export default class GetWorstSellingStores {
	constructor(private analyticsService: IAnalyticsService) {}

	async execute(): Promise<StoreAnalytics[]> {
		return await this.analyticsService.getWorstSellingStores()
	}
}
