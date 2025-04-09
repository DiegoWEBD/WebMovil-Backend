import { Request, Response } from 'express'
import IUserService from '../application/IUserService.interface'

export default class UserController {
	private userService: IUserService

	constructor(userService: IUserService) {
		this.userService = userService

		this.getUserByEmail = this.getUserByEmail.bind(this)
		this.registerUser = this.registerUser.bind(this)
	}

	getUserByEmail(req: Request, res: Response): void {
		const email = req.params.email

		this.userService
			.getUserByEmail(email)
			.then(user => res.status(200).json({ ...user }))
			.catch(err => res.status(400).json({ error: err.message }))
	}

	registerUser(req: Request, res: Response): void {
		const { email, user_type } = req.body

		this.userService
			.registerUser(email, user_type)
			.then(user => res.status(201).json(user))
			.catch(err => {
				res.status(400).json({ error: err.message })
			})
	}
}
