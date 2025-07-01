import DeliveryDetails from '../DeliveryDetails/DeliveryDetails'
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
	private deliveryDetails: DeliveryDetails | undefined
	private status:
		| 'Pendiente'
		| 'Buscando repartidor'
		| 'En camino'
		| 'Lista para retiro'
		| 'Completada'

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
		dispatch: Dispatch | undefined,
		deliveryDetails: DeliveryDetails | undefined,
		status:
			| 'Pendiente'
			| 'Buscando repartidor'
			| 'En camino'
			| 'Lista para retiro'
			| 'Completada'
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
		this.deliveryDetails = deliveryDetails
		this.status = status
	}

	getCode(): string | undefined {
		return this.code
	}

	setCode(code: string | undefined): void {
		this.code = code
	}

	getStatus():
		| 'Pendiente'
		| 'Buscando repartidor'
		| 'En camino'
		| 'Lista para retiro'
		| 'Completada' {
		return this.status
	}

	setStatus(
		status:
			| 'Pendiente'
			| 'Buscando repartidor'
			| 'En camino'
			| 'Lista para retiro'
			| 'Completada'
	): void {
		this.status = status
	}

	getUserEmail(): string {
		return this.userEmail
	}

	getDeliveryDetails(): DeliveryDetails | undefined {
		return this.deliveryDetails
	}

	setDeliveryDetails(deliveryDetails: DeliveryDetails): void {
		this.deliveryDetails = deliveryDetails
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
