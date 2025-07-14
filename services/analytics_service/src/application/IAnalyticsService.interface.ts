import StoreAnalytics from '../domain/StoreAnalytics'

export default interface IAnalyticsService {
	getBestSellingStores(): Promise<StoreAnalytics[]>
	getWorstSellingStores(): Promise<StoreAnalytics[]>
}
