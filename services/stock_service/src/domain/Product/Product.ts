export default class Product {
	private code: string
	private name: string
	private description: string
	private price: number
	private store_id: string
	private picture: string
	private stock: string

	constructor(
		code: string,
		name: string,
		description: string,
		price: number,
		store_id: string,
		picture: string,
		stock: string
	) {
		this.code = code
		this.name = name
		this.price = price
		this.description = description
		this.store_id = store_id
		this.picture = picture
		this.stock = stock
	}

	public getCode(): string {
		return this.code
	}

	public getName(): string {
		return this.name
	}

	public getDescription(): string {
		return this.description
	}

	public getPrice(): number {
		return this.price
	}

	public getStoreId(): string {
		return this.store_id
	}

	public getPicture(): string {
		return this.picture
	}

	public getStock(): string {
		return this.stock
	}
}
