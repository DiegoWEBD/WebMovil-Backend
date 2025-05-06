import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

// Token cache
type TokenCache = { value: string; expiresAt: number }
const tokenCache: TokenCache = { value: '', expiresAt: 0 }

export const authenticateApiGateway = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const CLIENT_ID = process.env.CLIENT_ID || 'gateway'
	const CLIENT_SECRET = process.env.CLIENT_SECRET || 'gateway-secret'

	let serviceToken: string

	if (Date.now() < tokenCache.expiresAt - 20000) serviceToken = tokenCache.value

	const body = {
		grant_type: 'client_credentials',
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	}
	try {
		const response = await axios.post(
			'http://token-service:4000/oauth2/token',
			body
		)
		tokenCache.value = response.data.access_token
		tokenCache.expiresAt = Date.now() + response.data.expires_in * 1000
	} catch (error: any) {
		res.status(401).json({
			error: error.response?.data?.error || 'Error de autenticación',
		})
		console.error('Error al obtener un token de servicio para el gateway:')
		console.log(error.response?.data?.error || error.message)
		return
	}

	serviceToken = tokenCache.value

	req.headers['x-service-authorization'] = `Bearer ${tokenCache.value}`
	next()
}
