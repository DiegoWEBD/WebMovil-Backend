import { NextFunction, Request, Response } from 'express'
import axios from 'axios'

const authenticateService = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const serviceToken = req.headers['X-Service-Authorization']

	const authenticationRequestHeaders = {
		'X-Service-Authorization': serviceToken,
	}

	try {
		await axios.get('http://token-service:4000/oauth2/validate', {
			headers: authenticationRequestHeaders,
		})
		next()
	} catch (error) {
		res.status(401).json({
			error: 'Fallo en la autenticación del servicio',
		})
		return
	}
}

export default authenticateService
