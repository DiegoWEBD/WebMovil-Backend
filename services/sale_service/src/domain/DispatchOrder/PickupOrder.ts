import DispatchOrder from './DispatchOrder'

export default class PickupOrder extends DispatchOrder {
	private availableFrom: Date
	private availableUntil: Date

	constructor(
		code: string,
		issueDate: Date,
		availableFrom: Date,
		availableUntil: Date
	) {
		super(code, issueDate)
		this.availableFrom = availableFrom
		this.availableUntil = availableUntil
	}

	getAvailableFrom(): Date {
		return this.availableFrom
	}

	getAvailableUntil(): Date {
		return this.availableUntil
	}
}
