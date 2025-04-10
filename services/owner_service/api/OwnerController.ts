import { Request, Response } from 'express'
import IOwnerService from '../application/IOwnerService.interface'

export default class UserController {
	private ownerService: IOwnerService

	constructor(ownerService: IOwnerService) {
		this.ownerService = ownerService

		this.getOwnerByEmail = this.getOwnerByEmail.bind(this)
		this.registerOwner = this.registerOwner.bind(this)
		this.getOwners = this.getOwners.bind(this)
	}

	getOwners(_: Request, res: Response): void {
		this.ownerService
			.getOwners()
			.then(owners => res.status(200).json(owners))
			.catch(err => res.status(400).json({ error: err.message }))
	}

	getOwnerByEmail(req: Request, res: Response): void {
		const email = req.params.email

		this.ownerService
			.getOwnerByEmail(email)
			.then(owner => res.status(200).json({ ...owner }))
			.catch(err => res.status(400).json({ error: err.message }))
	}

	registerOwner(req: Request, res: Response): void {
		const { email, phone, full_name, profile_picture } = req.body

		this.ownerService
			.registerOwner(email, phone, full_name, profile_picture)
			.then(owner => res.status(201).json(owner))
			.catch(err => {
				res.status(400).json({ error: err.message })
			})
	}
}
