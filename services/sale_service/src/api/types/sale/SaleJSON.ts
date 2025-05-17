export default interface SaleJSON {
	code: string
	user_email: string
	store_id: string
	total: number
	date: Date
	feedback_id: string | undefined
}
