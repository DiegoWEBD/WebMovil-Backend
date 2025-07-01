import Dispatch from '../Dispatch/Dispatch'
import DispatchMethod from '../DispatchMethod/DispatchMethod'
import DispatchOrder from '../DispatchOrder/DispatchOrder'
import SaleDetail from '../SaleDetail/SaleDetail'

export default class Sale {
	private code: string | undefined
	private userEmail: string
	private userName: string
	private storeId: string
	private storeName: string
	private total: number
	private date: Date
	private feedbackId: string | undefined
	private details: SaleDetail[]
	private dispatchMethod: DispatchMethod | undefined
	private dispatchOrder: DispatchOrder | undefined
	private dispatch: Dispatch | undefined

	constructor(
		code: string | undefined,
		userEmail: string,
		userName: string,
		storeId: string,
		storeName: string,
		total: number,
		date: Date,
		feedbackId: string | undefined,
		details: SaleDetail[],
		dispatchMethod: DispatchMethod | undefined,
		dispatchOrder: DispatchOrder | undefined,
		dispatch: Dispatch | undefined
	) {
		this.code = code
		this.userEmail = userEmail
		this.userName = userName
		this.storeId = storeId
		this.storeName = storeName
		this.total = total
		this.date = date
		this.details = details
		this.feedbackId = feedbackId
		this.dispatchOrder = dispatchOrder
		this.dispatch = dispatch
		this.dispatchMethod = dispatchMethod
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

	getUserName(): string {
		return this.userName
	}

	getStoreId(): string {
		return this.storeId
	}

	getStoreName(): string {
		return this.storeName
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

	getDispatchMethod(): DispatchMethod | undefined {
		return this.dispatchMethod
	}

	setDispatchMethod(dispatchMethod: DispatchMethod): void {
		this.dispatchMethod = dispatchMethod
	}

	getFeedbackId(): string | undefined {
		return this.feedbackId
	}

	getDispatchOrder(): DispatchOrder | undefined {
		return this.dispatchOrder
	}

	setDispatchOrder(dispatchOrder: DispatchOrder): void {
		this.dispatchOrder = dispatchOrder
	}

	getDispatch(): Dispatch | undefined {
		return this.dispatch
	}

	setDispatch(dispatch: Dispatch): void {
		this.dispatch = dispatch
	}
}
