import Deliveryman from '../domain/Deliveryman'
import DeliverymanRepository from '../domain/DeliverymanRepository.interface'
import IDeliverymanService from './IDeliverymanService.interface'
import GetDeliverymen from './use_cases/GetDeliverymen'
import GetDeliverymanByEmail from './use_cases/GetDeliverymanByEmail'
import RegisterDeliveryman from './use_cases/RegisterDeliveryman'

export default class DeliverymanService implements IDeliverymanService {
	private _getDeliverymen: GetDeliverymen
	private _getDeliverymanByEmail: GetDeliverymanByEmail
	private _registerDeliveryman: RegisterDeliveryman

	constructor(deliverymanRepository: DeliverymanRepository) {
		this._getDeliverymen = new GetDeliverymen(deliverymanRepository)
		this._getDeliverymanByEmail = new GetDeliverymanByEmail(
			deliverymanRepository
		)
		this._registerDeliveryman = new RegisterDeliveryman(deliverymanRepository)
	}

	getDeliverymen(): Promise<Deliveryman[]> {
		return this._getDeliverymen.execute()
	}

	getDeliverymanByEmail(email: string): Promise<Deliveryman | null> {
		return this._getDeliverymanByEmail.execute(email)
	}

	registerDeliveryman(
		email: string,
		name: string,
		phone: string,
		vehicleType: string,
		vehiclePlate: string
	): Promise<Deliveryman> {
		return this._registerDeliveryman.execute(
			email,
			name,
			phone,
			vehicleType,
			vehiclePlate
		)
	}
}
