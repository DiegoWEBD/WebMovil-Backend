import axios from 'axios'
import { getGoogleUserEmail, validateGoogleAccessToken } from './shared'

export default class Validate {
	async execute(googleAccessToken: string): Promise<any> {
		await validateGoogleAccessToken(googleAccessToken)
		const email = await getGoogleUserEmail(googleAccessToken)
		let existingUserResponse

		try {
			existingUserResponse = await axios.get(
				`http://api-gateway:3000/users/${encodeURIComponent(email)}`
			)
		} catch (error) {
			throw new Error('El correo ingresado no se encuentra registrado')
		}

		// En este punto, ya se ha validado la existencia del usuario en el sistema
		const existingUser = existingUserResponse.data
		return { email: existingUser.email, user_type: existingUser.user_type }
	}
}
