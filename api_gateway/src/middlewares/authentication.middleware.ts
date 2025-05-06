import { NextFunction, Request, Response } from 'express'
import serviceClient from '../axios/service_client'

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const accessToken = req.headers.authorization?.split(' ')[1]

	if (!accessToken) {
		res
			.status(401)
			.json({ message: 'No tiene permisos para acceder a este recurso' })
		return
	}

	try {
		const { data } = await serviceClient.get('/auth-service:3006/validate', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		const { user_email, user_type } = data
		req.headers['validated-user-email'] = user_email
		req.headers['validated-user-type'] = user_type
		next()
	} catch (error) {
		res
			.status(401)
			.json({ message: 'No tiene permisos para acceder a este recurso' })
	}
}
