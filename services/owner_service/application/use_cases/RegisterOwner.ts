import axios from 'axios'

import Owner from '../../domain/Owner'
import OwnerRepository from '../../domain/OwnerRepository.interface'

export default class RegisterUser {
	private ownerRepository: OwnerRepository

	constructor(ownerRepository: OwnerRepository) {
		this.ownerRepository = ownerRepository
	}

	async execute(
		email: string,
		fullName: string,
		profilePicture: string
	): Promise<Owner> {
		const encodedEmail = encodeURIComponent(email)
		let existingUser = false

		try {
			await axios.get(`http://api-gateway:3000/users/${encodedEmail}`)
			existingUser = true
		} catch (_) {}

		if (existingUser) {
			throw new Error('El correo ingresado ya se encuentra registrado.')
		}

		await axios.post('http://user-service:3001/', {
			email,
			full_name: fullName,
			profile_picture: profilePicture,
		})

		const user = new Owner(email)
		await this.ownerRepository.add(user)

		return user
	}
}
