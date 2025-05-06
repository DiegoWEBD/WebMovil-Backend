import axios from 'axios'

import Owner from '../../domain/Owner'
import OwnerRepository from '../../domain/OwnerRepository.interface'

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
		const serviceAuthResponse = await axios.post(
			'http://token-service:4000/oauth2/token',
			{
				grant_type: 'client_credentials',
				client_id: process.env.CLIENT_ID,
				client_secret: process.env.CLIENT_SECRET,
			}
		)

		const serviceToken: string = serviceAuthResponse.data.access_token

		const encodedEmail = encodeURIComponent(email)
		let existingUser = false

		try {
			await axios.get(`http://api-gateway:3000/users/${encodedEmail}`)
			existingUser = true
		} catch (_) {}

		if (existingUser) {
			throw new Error('El correo ingresado ya se encuentra registrado.')
		}

		await axios.post(
			'http://user-service:3001',
			{
				email,
				phone,
				full_name: fullName,
				profile_picture: profilePicture,
				user_type: 'owner',
			},
			{
				headers: {
					'x-service-authorization': `Bearer ${serviceToken}`,
				},
			}
		)

		const owner = new Owner(email)
		await this.ownerRepository.add(owner)

		return owner
	}
}
