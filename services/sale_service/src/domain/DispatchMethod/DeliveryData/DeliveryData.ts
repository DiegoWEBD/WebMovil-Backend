import DispatchMethod from '../DispatchMethod'

export default class DeliveryData implements DispatchMethod {
	type: string
	id: string | undefined
	private street: string
	private number: string
	private customerInstructions: string | undefined

	constructor(
		id: string | undefined,
		street: string,
		number: string,
		customerInstructions?: string
	) {
		this.id = id
		this.type = 'delivery'
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
