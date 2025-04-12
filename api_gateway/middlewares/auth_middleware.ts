import axios from 'axios'
import { NextFunction, Response } from 'express'
import CustomExpressRequest from './types/CustomExpressRequest'

export const authMiddleware = async (
	req: CustomExpressRequest,
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
		const { data } = await axios.get('http://auth-service:3006/validate', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		// const { user_email, user_type } = data
		next()
	} catch (error) {
		res
			.status(401)
			.json({ message: 'No tiene permisos para acceder a este recurso' })
	}
}
