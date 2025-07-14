import IAnalyticsService from '../IAnalyticsService.interface'
import StoreAnalytics from '../../domain/StoreAnalytics'

export default class GetBestSellingStores {
	constructor(private analyticsService: IAnalyticsService) {}

	async execute(): Promise<StoreAnalytics[]> {
		return await this.analyticsService.getBestSellingStores()
	}
}
