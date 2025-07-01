import DispatchOrder from './DispatchOrder'

export default class PickupOrder extends DispatchOrder {
	private storeDirection: string

	constructor(id: string | undefined, storeDirection: string) {
		super(id, 'pickup')
		this.storeDirection = storeDirection
	}

	getStoreDirection(): string {
		return this.storeDirection
	}
}
