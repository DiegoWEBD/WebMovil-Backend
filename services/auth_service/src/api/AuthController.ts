import { Request, Response } from 'express'
import IGoogleAuthService from '../application/IGoogleAuthService.interface'

export default class AuthController {
	private authService: IGoogleAuthService

	constructor(authService: IGoogleAuthService) {
		this.authService = authService

		this.validate = this.validate.bind(this)
		this.register = this.register.bind(this)
	}

	validate(req: Request, res: Response): void {
		if (!req.headers.authorization) {
			res.status(401).json({
				error: 'Se ha proporcionado un access_token de Google inválido',
			})
			return
		}
		const googleAccessToken = req.headers.authorization.split(' ')[1]

		this.authService
			.validate(googleAccessToken)
			.then(response => res.status(200).json(response))
			.catch(error => res.status(401).json({ error: error.message }))
	}

	register(req: Request, res: Response): void {
		if (!req.headers.authorization) {
			res.status(401).json({
				error: 'Se ha proporcionado un access_token de Google inválido',
			})
			return
		}

		const googleAccessToken = req.headers.authorization.split(' ')[1]
		const { phone, full_name, profile_picture, user_type } = req.body

		this.authService
			.register(googleAccessToken, phone, full_name, profile_picture, user_type)
			.then(email => {
				console.log('User registered:', email)
				res.status(201).json(email)
			})
			.catch(error => res.status(401).json({ error: error.message }))
	}
}
