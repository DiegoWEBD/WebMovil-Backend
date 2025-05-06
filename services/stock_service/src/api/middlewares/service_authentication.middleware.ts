import { NextFunction, Request, Response } from 'express'
import axios from 'axios'

const authenticateService = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await axios.get('http://token-service:4000/oauth2/validate', {
			headers: {
				'x-service-authorization': req.headers['x-service-authorization'],
			},
		})
		next()
	} catch (error: any) {
		res.status(401).json({
			error:
				error.response?.data?.error || 'Fallo en la autenticación del servicio',
		})
		return
	}
}

export default authenticateService
