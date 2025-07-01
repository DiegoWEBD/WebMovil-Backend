import Deliveryman from '../../domain/Deliveryman'
import DeliverymanRepository from '../../domain/DeliverymanRepository.interface'
import serviceClient from '../../infrastructure/axios/service_client'

export default class RegisterDeliveryman {
	private deliverymanRepository: DeliverymanRepository

	constructor(deliverymanRepository: DeliverymanRepository) {
		this.deliverymanRepository = deliverymanRepository
	}

	async execute(
		email: string,
		name: string,
		phone: string,
		vehicleType: string,
		vehiclePlate: string
	): Promise<Deliveryman> {
		const encodedEmail = encodeURIComponent(email)
		let existingUser = false

		try {
			await serviceClient.get(`/user-service:3001/${encodedEmail}`)
			existingUser = true
			console.log('existingUser', existingUser)
		} catch (_) {}

		if (existingUser) {
			throw new Error('El correo ingresado ya se encuentra registrado.')
		}

		const response = await serviceClient.post('/user-service:3001', {
			email,
			phone,
			full_name: name,
			profile_picture: 'picture-png',
			user_type: 'delivery-man',
		})
		console.log(response)

		const deliveryman = new Deliveryman(
			undefined,
			email,
			name,
			phone,
			vehicleType,
			vehiclePlate
		)

		await this.deliverymanRepository.add(deliveryman)
		return deliveryman
	}
}
