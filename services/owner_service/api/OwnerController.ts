import { Request, Response } from 'express'
import IOwnerService from '../application/IOwnerService.interface'

export default class UserController {
	private ownerService: IOwnerService

	constructor(ownerService: IOwnerService) {
		this.ownerService = ownerService

		this.getOwnerByEmail = this.getOwnerByEmail.bind(this)
		this.registerOwner = this.registerOwner.bind(this)
	}

	getOwnerByEmail(req: Request, res: Response): void {
		const email = req.params.email

		this.ownerService
			.getOwnerByEmail(email)
			.then(user => res.status(200).json({ ...user }))
			.catch(err => res.status(400).json({ error: err.message }))
	}

	registerOwner(req: Request, res: Response): void {
		const { email, full_name, profile_picture } = req.body

		this.ownerService
			.registerOwner(email, full_name, profile_picture)
			.then(user => res.status(201).json(user))
			.catch(err => {
				res.status(400).json({ error: err.message })
			})
	}
}
