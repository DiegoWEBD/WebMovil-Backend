import IAnalyticsService from './IAnalyticsService.interface'
import StoreAnalytics from '../domain/StoreAnalytics'
import GetBestSellingStores from './use_cases/GetBestSellingStores'
import GetWorstSellingStores from './use_cases/GetWorstSellingStores'
import serviceClient from '../infrastructure/axios/service_client'

export default class AnalyticsService implements IAnalyticsService {
	private getBestSellingStoresUseCase: GetBestSellingStores
	private getWorstSellingStoresUseCase: GetWorstSellingStores

	constructor() {
		this.getBestSellingStoresUseCase = new GetBestSellingStores(this)
		this.getWorstSellingStoresUseCase = new GetWorstSellingStores(this)
	}

	async getBestSellingStores(): Promise<StoreAnalytics[]> {
		const oneWeekAgo = new Date()
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

		// Fetch sales from sale service
		const salesResponse = await serviceClient.get('/sale-service:3007')

		const sales = salesResponse.data

		// Filter sales from last week
		const recentSales = sales.filter((sale: any) => {
			const saleDate = new Date(sale.date)
			return saleDate >= oneWeekAgo
		})

		// Group sales by store and calculate metrics
		const storeMetrics = new Map<
			string,
			{ sales: any[]; totalRevenue: number; salesCount: number }
		>()

		for (const sale of recentSales) {
			if (!storeMetrics.has(sale.storeId)) {
				storeMetrics.set(sale.storeId, {
					sales: [],
					totalRevenue: 0,
					salesCount: 0,
				})
			}

			const storeData = storeMetrics.get(sale.storeId)!
			storeData.sales.push(sale)
			storeData.totalRevenue += sale.total || 0
			storeData.salesCount += 1
		}

		const storesResponse = await serviceClient.get(
			'/store-service:3004?limit=100000'
		)

		const storeNameMap = new Map<string, string>()
		storesResponse.data.stores.forEach((store: any) => {
			storeNameMap.set(store.id, store.name)
		})

		// Create StoreAnalytics objects and sort by total revenue (descending)
		const analytics = Array.from(storeMetrics.entries()).map(
			([storeId, metrics]) => {
				return new StoreAnalytics(
					storeId,
					storeNameMap.get(storeId) || 'Unknown Store',
					metrics.totalRevenue,
					metrics.totalRevenue,
					metrics.salesCount
				)
			}
		)

		// Return top 5 stores by revenue
		return analytics
			.sort((a, b) => b.total_revenue - a.total_revenue)
			.slice(0, 5)
	}

	async getWorstSellingStores(): Promise<StoreAnalytics[]> {
		const oneWeekAgo = new Date()
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

		// Fetch sales from sale service
		const salesResponse = await serviceClient.get('/sale-service:3007')

		const sales = salesResponse.data

		// Filter sales from last week
		const recentSales = sales.filter((sale: any) => {
			const saleDate = new Date(sale.date)
			return saleDate >= oneWeekAgo
		})

		// Group sales by store and calculate metrics
		const storeMetrics = new Map<
			string,
			{ sales: any[]; totalRevenue: number; salesCount: number }
		>()

		for (const sale of recentSales) {
			if (!storeMetrics.has(sale.storeId)) {
				storeMetrics.set(sale.storeId, {
					sales: [],
					totalRevenue: 0,
					salesCount: 0,
				})
			}

			const storeData = storeMetrics.get(sale.storeId)!
			storeData.sales.push(sale)
			storeData.totalRevenue += sale.total || 0
			storeData.salesCount += 1
		}

		const storesResponse = await serviceClient.get(
			'/store-service:3004?limit=100000'
		)

		const storeNameMap = new Map<string, string>()
		storesResponse.data.stores.forEach((store: any) => {
			storeNameMap.set(store.id, store.name)
		})

		// Create StoreAnalytics objects and sort by total revenue (ascending)
		const analytics = Array.from(storeMetrics.entries()).map(
			([storeId, metrics]) => {
				return new StoreAnalytics(
					storeId,
					storeNameMap.get(storeId) || 'Unknown Store',
					metrics.totalRevenue,
					metrics.totalRevenue,
					metrics.salesCount
				)
			}
		)

		// Return bottom 5 stores by revenue
		return analytics
			.sort((a, b) => a.total_revenue - b.total_revenue)
			.slice(0, 5)
	}
}
