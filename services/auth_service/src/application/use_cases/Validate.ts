import { OAuth2Client } from 'google-auth-library'
import serviceClient from '../../infrastructure/axios/service_client'

export default class Validate {
	async execute(googleAccessToken: string): Promise<any> {
		const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

		const ticket = await client.verifyIdToken({
			idToken: googleAccessToken,
			audience: process.env.GOOGLE_CLIENT_ID,
		})
		const payload = ticket.getPayload()

		if (!payload || !payload.email) {
			throw new Error('No se ha podido validar su identidad')
		}

		let existingUserResponse

		try {
			existingUserResponse = await serviceClient.get(
				`/user-service:3001/${encodeURIComponent(payload.email)}`
			)
		} catch (error) {
			throw new Error('El correo ingresado no se encuentra registrado')
		}

		// En este punto, ya se ha validado la existencia del usuario en el sistema
		const existingUser = existingUserResponse.data
		return { user_email: existingUser.email, user_type: existingUser.user_type }
	}
	/*async execute(googleAccessToken: string): Promise<any> {
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
	}*/
}
