import { Request, Response } from 'express'
import IStoreService from '../application/IStoreService.interface'

export default class StoreController {
	private storeService: IStoreService

	constructor(storeService: IStoreService) {
		this.storeService = storeService

		this.getAllStores = this.getAllStores.bind(this)
		this.registerStore = this.registerStore.bind(this)
		this.getStoresByOwnerEmail = this.getStoresByOwnerEmail.bind(this)
	}

	getAllStores(_: Request, res: Response): void {
		this.storeService
			.getStores()
			.then(stores => res.status(200).json({ stores }))
			.catch(err => res.status(500).json({ error: err.message }))
	}

	registerStore(req: Request, res: Response): void {
		const { name, description, direction, phone, owner_email } = req.body
		this.storeService
			.registerStore(name, description, direction, phone, owner_email)
			.then(store => res.status(201).json({ store }))
			.catch(err => res.status(500).json({ error: err.message }))
	}

	getStoresByOwnerEmail(req: Request, res: Response): void {
		const ownerEmail = req.params.owner_email
		this.storeService
			.getStoresByOwnerEmail(ownerEmail)
			.then(stores => res.status(200).json({ stores }))
			.catch(err => res.status(500).json({ error: err.message }))
	}
}
