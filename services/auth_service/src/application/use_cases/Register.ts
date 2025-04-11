import axios from 'axios'
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
			await axios.get(
				`http://api-gateway:3000/users/${encodeURIComponent(email)}`
			)
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
		const response = await axios.post('http://owner-service:3005', {
			email,
			phone,
			full_name: fullName,
			profile_picture: profilePicture,
		})
		return response.data.email
	}
}
