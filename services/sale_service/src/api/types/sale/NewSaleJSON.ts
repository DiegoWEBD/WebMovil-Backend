import DeliveryDataJSON from '../DispatchMethod/DeliveryDataJSON'
import PickupDataJSON from '../DispatchMethod/PickupDataJSON'
import NewSaleProductJSON from './NewSaleProductJSON'

export default interface NewSaleJSON {
	user_email: string
	store_id: string
	products: NewSaleProductJSON[]
	dispatch_method: DeliveryDataJSON | PickupDataJSON
}
