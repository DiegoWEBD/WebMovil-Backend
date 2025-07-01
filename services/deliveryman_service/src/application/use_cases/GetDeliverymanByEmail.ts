import Deliveryman from '../../domain/Deliveryman'
import DeliverymanRepository from '../../domain/DeliverymanRepository.interface'

export default class GetDeliverymanByEmail {
	private deliverymanRepository: DeliverymanRepository

	constructor(deliverymanRepository: DeliverymanRepository) {
		this.deliverymanRepository = deliverymanRepository
	}

	async execute(email: string): Promise<Deliveryman | null> {
		return await this.deliverymanRepository.getByEmail(email)
	}
}
