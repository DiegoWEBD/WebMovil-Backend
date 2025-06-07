export type SaleSummary = {
	code: string
	userName: string
	storeId: string
	storeName: string
	total: number
	date: Date
	dispatchMethod: 'delivery' | 'pickup'
	status: string
}
