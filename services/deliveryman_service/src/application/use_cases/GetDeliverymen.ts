import Deliveryman from '../../domain/Deliveryman'
import DeliverymanRepository from '../../domain/DeliverymanRepository.interface'

export default class GetDeliverymen {
	private deliverymanRepository: DeliverymanRepository

	constructor(deliverymanRepository: DeliverymanRepository) {
		this.deliverymanRepository = deliverymanRepository
	}

	async execute(): Promise<Deliveryman[]> {
		return await this.deliverymanRepository.getAll()
	}
}
