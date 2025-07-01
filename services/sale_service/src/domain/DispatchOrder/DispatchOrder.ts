export default class DispatchOrder {
	protected id: string | undefined
	protected type: string

	constructor(id: string | undefined, type: string) {
		this.id = id
		this.type = type
	}

	getId(): string | undefined {
		return this.id
	}

	getType(): string {
		return this.type
	}

	setId(id: string) {
		this.id = id
	}
}
