import { Request, RequestHandler, Response } from 'express'
import serviceClient from '../axios/service_client'

const createSecuredHttpProxy = (target: string): RequestHandler => {
	return async (req: Request, res: Response) => {
		const proxiedPath = req.originalUrl.replace(req.baseUrl, '') || '/'
		const targetUrl = new URL(proxiedPath, target).toString()

		try {
			const response = await serviceClient({
				method: req.method,
				url: targetUrl,
				data: req.body,
				headers: {
					...req.headers,
					host: undefined, // eliminamos cabeceras potencialmente problemáticas
					'content-length': undefined,
				},
			})

			res.status(response.status).set(response.headers).send(response.data)
		} catch (error: any) {
			res.status(error.response?.status || 500).json({
				error: error.message,
				details: error.response?.data || null,
			})
		}
	}
}

export default createSecuredHttpProxy
