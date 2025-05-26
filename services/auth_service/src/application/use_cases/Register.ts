import serviceClient from '../../infrastructure/axios/service_client'
import BasicUserInfo from '../types/BasicUserInfo'
import { getGoogleUserInfo, validateGoogleAccessToken } from './shared'

export default class Register {
	async execute(
		googleAccessToken: string,
		phone: string,
		fullName: string,
		profilePicture: string,
		userType: string
	): Promise<BasicUserInfo> {
		await validateGoogleAccessToken(googleAccessToken)
		const userInfo = await getGoogleUserInfo(googleAccessToken)
		let existingUser: boolean

		try {
			await serviceClient.get(
				`/user-service:3001/${encodeURIComponent(userInfo.email)}`
			)
			existingUser = true
		} catch (_) {
			existingUser = false
		}

		if (existingUser) {
			throw new Error('El correo ingresado ya se encuentra registrado')
		}

		if (userType === 'owner') {
			return await this.registerOwner(
				userInfo.email,
				phone,
				userInfo.name,
				profilePicture
			)
		} else if (userType === 'client') {
			return await this.registerClient(
				userInfo.email,
				phone,
				userInfo.name,
				profilePicture
			)
		}

		throw new Error('Tipo de usuario inválido')
	}

	private async registerOwner(
		email: string,
		phone: string,
		fullName: string,
		profilePicture: string
	): Promise<BasicUserInfo> {
		const response = await serviceClient.post('/owner-service:3005', {
			email,
			phone,
			full_name: fullName,
			profile_picture: profilePicture,
		})

		return { email: response.data.email, user_type: 'owner' }
	}

	private async registerClient(
		email: string,
		phone: string,
		fullName: string,
		profilePicture: string
	): Promise<BasicUserInfo> {
		const response = await serviceClient.post('/user-service:3001', {
			email,
			phone,
			full_name: fullName,
			profile_picture: profilePicture,
			user_type: 'client',
		})

		return { email: response.data.email, user_type: 'client' }
	}
}
