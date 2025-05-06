import axios from 'axios'
import { NextFunction, Request, RequestHandler, Response } from 'express'

const createHttpProxyMiddleware = (target: string): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const proxiedPath = req.originalUrl.replace(req.baseUrl, '') || '/'
		const targetUrl = new URL(proxiedPath, target).toString()

		try {
			const response = await axios({
				method: req.method,
				url: targetUrl,
				data: req.body,
				headers: req.headers,
			})

			res.status(response.status).json(response.data)
		} catch (error: any) {
			res.status(error.response?.status || 500).json({
				error: error.message,
			})
		}
	}
}

export default createHttpProxyMiddleware
