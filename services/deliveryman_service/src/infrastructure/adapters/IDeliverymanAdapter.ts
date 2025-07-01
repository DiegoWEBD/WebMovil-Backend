import Deliveryman from '../../domain/Deliveryman'
import { IDeliveryman } from '../mongo_repository/DeliverymanModel'

export default class IDeliverymanAdapter extends Deliveryman {
	constructor(deliverymanI: IDeliveryman) {
		super(
			deliverymanI._id.toString(),
			deliverymanI.email,
			deliverymanI.name,
			deliverymanI.phone,
			deliverymanI.vehicleType,
			deliverymanI.vehiclePlate,
			deliverymanI.isAvailable
		)
	}
}
