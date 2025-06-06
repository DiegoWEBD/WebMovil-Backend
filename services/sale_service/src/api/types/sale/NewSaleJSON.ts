import NewSaleProductJSON from './NewSaleProductJSON'

export default interface NewSaleJSON {
	user_email: string
	store_id: string
	products: NewSaleProductJSON[]
	dispatch_method: 'delivery' | 'pickup'
}
