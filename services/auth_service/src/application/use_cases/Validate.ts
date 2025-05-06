import serviceClient from '../../infrastructure/axios/service_client'
import { getGoogleUserEmail, validateGoogleAccessToken } from './shared'

export default class Validate {
	async execute(googleAccessToken: string): Promise<any> {
		await validateGoogleAccessToken(googleAccessToken)
		const email = await getGoogleUserEmail(googleAccessToken)
		let existingUserResponse

		try {
			existingUserResponse = await serviceClient.get(
				`/user-service:3001/${encodeURIComponent(email)}`
			)
		} catch (error) {
			throw new Error('El correo ingresado no se encuentra registrado')
		}

		// En este punto, ya se ha validado la existencia del usuario en el sistema
		const existingUser = existingUserResponse.data
		return { user_email: existingUser.email, user_type: existingUser.user_type }
	}
}
