import SaleDetail from '../sale_detail/SaleDetail'

export default class Sale {
	private code: string | undefined
	private userEmail: string
	private storeId: string
	private total: number
	private date: Date
	private details: SaleDetail[]
	private feedbackId: string | undefined

	constructor(
		code: string | undefined,
		userEmail: string,
		storeId: string,
		total: number,
		date: Date,
		details: SaleDetail[],
		feedbackId: string | undefined
	) {
		this.code = code
		this.userEmail = userEmail
		this.storeId = storeId
		this.total = total
		this.date = date
		this.details = details
		this.feedbackId = feedbackId
	}

	getCode(): string | undefined {
		return this.code
	}

	setCode(code: string | undefined): void {
		this.code = code
	}

	getUserEmail(): string {
		return this.userEmail
	}

	getStoreId(): string {
		return this.storeId
	}

	getTotal(): number {
		return this.total
	}

	getDate(): Date {
		return this.date
	}

	getDetails(): SaleDetail[] {
		return this.details
	}

	getFeedbackId(): string | undefined {
		return this.feedbackId
	}
}
