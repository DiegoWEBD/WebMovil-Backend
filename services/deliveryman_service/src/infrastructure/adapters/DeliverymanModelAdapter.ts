import Deliveryman from '../../domain/Deliveryman'
import DeliverymanModel from '../mongo_repository/DeliverymanModel'

export default class DeliverymanModelAdapter extends DeliverymanModel {
	constructor(deliveryman: Deliveryman) {
		super({
			email: deliveryman.getEmail(),
			name: deliveryman.getName(),
			phone: deliveryman.getPhone(),
			vehicleType: deliveryman.getVehicleType(),
			vehiclePlate: deliveryman.getVehiclePlate(),
			isAvailable: deliveryman.getIsAvailable(),
		})
	}
}
