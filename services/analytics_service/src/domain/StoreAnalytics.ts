export default class StoreAnalytics {
	constructor(
		public readonly store_id: string,
		public readonly store_name: string,
		public readonly total_sales: number,
		public readonly total_revenue: number,
		public readonly sales_count: number
	) {}
}
