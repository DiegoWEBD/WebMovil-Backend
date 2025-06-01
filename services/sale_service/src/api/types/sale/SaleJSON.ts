export default interface SaleJSON {
	code: string
	user_email: string
	store_id: string
	total: number
	date: Date
	status: string
	feedback_id: string | undefined
}
