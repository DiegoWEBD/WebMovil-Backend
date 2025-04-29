export default class Product {
	code: string
	name: string
	description: string
	price: number
	store_id: string
	picture: string

	constructor(
		code: string,
		name: string,
		description: string,
		price: number,
		store_id: string,
		picture: string
	) {
		this.code = code
		this.name = name
		this.price = price
		this.description = description
		this.store_id = store_id
		this.picture = picture
	}
}
