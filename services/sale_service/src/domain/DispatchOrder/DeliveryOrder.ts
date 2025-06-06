import DispatchOrder from './DispatchOrder'

export default class DeliveryOrder extends DispatchOrder {
	private price: number
	private street: string
	private number: string
	private customerInstructions: string | undefined

	constructor(
		code: string | undefined,
		issueDate: Date,
		price: number,
		street: string,
		number: string,
		customerInstructions?: string
	) {
		super(code, issueDate)
		this.price = price
		this.street = street
		this.number = number
		this.customerInstructions = customerInstructions
	}

	getPrice(): number {
		return this.price
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
