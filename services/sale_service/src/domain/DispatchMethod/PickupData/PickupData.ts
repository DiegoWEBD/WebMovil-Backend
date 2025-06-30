import DispatchMethod from '../DispatchMethod'

export default class PickupData implements DispatchMethod {
	type: string
	id: string | undefined
	private storeDirection: string

	constructor(id: string | undefined, storeDirection: string) {
		this.id = id
		this.type = 'pickup'
		this.storeDirection = storeDirection
	}

	getStoreDirection(): string {
		return this.storeDirection
	}
}
