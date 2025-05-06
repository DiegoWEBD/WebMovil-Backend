import Owner from '../../domain/Owner'
import OwnerRepository from '../../domain/OwnerRepository.interface'
import serviceClient from '../../infrastructure/axios/service_client'

export default class RegisterOwner {
	private ownerRepository: OwnerRepository

	constructor(ownerRepository: OwnerRepository) {
		this.ownerRepository = ownerRepository
	}

	async execute(
		email: string,
		phone: string,
		fullName: string,
		profilePicture: string
	): Promise<Owner> {
		const encodedEmail = encodeURIComponent(email)
		let existingUser = false

		try {
			await serviceClient.get(`/user-service:3001/${encodedEmail}`)
			existingUser = true
		} catch (_) {}

		if (existingUser) {
			throw new Error('El correo ingresado ya se encuentra registrado.')
		}

		await serviceClient.post('/user-service:3001', {
			email,
			phone,
			full_name: fullName,
			profile_picture: profilePicture,
			user_type: 'owner',
		})

		const owner = new Owner(email)
		await this.ownerRepository.add(owner)

		return owner
	}
}
