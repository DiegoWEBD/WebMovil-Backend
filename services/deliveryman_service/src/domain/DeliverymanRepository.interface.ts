import Deliveryman from './Deliveryman'

export default interface DeliverymanRepository {
	getAll(): Promise<Deliveryman[]>
	getByEmail(email: string): Promise<Deliveryman | null>
	add(deliveryman: Deliveryman): Promise<void>
}
