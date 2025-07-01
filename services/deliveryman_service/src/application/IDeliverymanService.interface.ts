import Deliveryman from '../domain/Deliveryman'

export default interface IDeliverymanService {
	getDeliverymen(): Promise<Deliveryman[]>
	getDeliverymanByEmail(email: string): Promise<Deliveryman | null>
	registerDeliveryman(
		email: string,
		name: string,
		phone: string,
		vehicleType: string,
		vehiclePlate: string
	): Promise<Deliveryman>
}
