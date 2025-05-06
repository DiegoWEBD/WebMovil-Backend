import serviceClient from '../../infrastructure/axios/service_client'
import { getGoogleUserEmail, validateGoogleAccessToken } from './shared'

export default class Register {
	async execute(
		googleAccessToken: string,
		phone: string,
		fullName: string,
		profilePicture: string,
		userType: string
	): Promise<string> {
		await validateGoogleAccessToken(googleAccessToken)
		const email = await getGoogleUserEmail(googleAccessToken)
		let existingUser: boolean

		try {
			await serviceClient.get(`/user-service:3001/${encodeURIComponent(email)}`)
			existingUser = true
		} catch (_) {
			existingUser = false
		}

		if (existingUser) {
			throw new Error('El correo ingresado ya se encuentra registrado')
		}

		if (userType === 'owner') {
			return await this.registerOwner(email, phone, fullName, profilePicture)
		}

		return ''
	}

	private async registerOwner(
		email: string,
		phone: string,
		fullName: string,
		profilePicture: string
	): Promise<string> {
		const response = await serviceClient.post('/owner-service:3005', {
			email,
			phone,
			full_name: fullName,
			profile_picture: profilePicture,
		})
		return response.data.email
	}
}
