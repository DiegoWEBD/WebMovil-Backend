import DispatchOrder from './DispatchOrder'

export default class DeliveryOrder extends DispatchOrder {
	private street: string
	private number: string
	private customerInstructions: string | undefined

	constructor(
		id: string | undefined,
		street: string,
		number: string,
		customerInstructions?: string
	) {
		super(id, 'delivery')

		this.street = street
		this.number = number
		this.customerInstructions = customerInstructions
	}

	getStreet(): string {
		return this.street
	}

	getNumber(): string {
		return this.number
	}

	getCustomerInstructions(): string | undefined {
		return this.customerInstructions
	}
}
