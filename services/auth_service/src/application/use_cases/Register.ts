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

		const serviceAuthResponse = await axios.post(
			'http://token-service:4000/oauth2/token',
			{
				grant_type: 'client_credentials',
				client_id: process.env.CLIENT_ID,
				client_secret: process.env.CLIENT_SECRET,
			}
		)

		const serviceToken: string = serviceAuthResponse.data.access_token

		try {
			await axios.get(`http://user-service:3001/${encodeURIComponent(email)}`, {
				headers: {
					'x-service-authorization': `Bearer ${serviceToken}`,
				},
			})
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
		const serviceAuthResponse = await axios.post(
			'http://token-service:4000/oauth2/token',
			{
				grant_type: 'client_credentials',
				client_id: process.env.CLIENT_ID,
				client_secret: process.env.CLIENT_SECRET,
			}
		)

		const serviceToken: string = serviceAuthResponse.data.access_token

		const response = await axios.post(
			'http://owner-service:3005',
			{
				email,
				phone,
				full_name: fullName,
				profile_picture: profilePicture,
			},
			{
				headers: {
					'x-service-authorization': `Bearer ${serviceToken}`,
				},
			}
		)
		return response.data.email
	}
}
