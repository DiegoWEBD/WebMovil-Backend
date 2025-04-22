import { Request, Response } from 'express'
import IStoreService from '../application/IStoreService.interface'

export default class StoreController {
	private storeService: IStoreService

	constructor(storeService: IStoreService) {
		this.storeService = storeService

		this.getStores = this.getStores.bind(this)
		this.registerStore = this.registerStore.bind(this)
		this.getStoresByOwnerEmail = this.getStoresByOwnerEmail.bind(this)
		this.findStoresByName = this.findStoresByName.bind(this)
	}

	async getStores(req: Request, res: Response): Promise<void> {
		let page = parseInt(req.query.page as string)
		let limit = parseInt(req.query.limit as string)
		let name = req.query.name as string

		page = isNaN(page) ? 1 : page
		limit = isNaN(limit) ? 10 : limit
		name = name || ''

		const totalStores = await this.storeService.countStores(name)

		this.storeService
			.getStores(name, page, limit)
			.then(stores =>
				res.status(200).json({
					meta: {
						total_stores: totalStores,
						current_page: page,
						limit: limit,
						total_pages: Math.ceil(totalStores / limit),
					},
					stores,
				})
			)
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

	findStoresByName(req: Request, res: Response): void {
		const storeName = req.query.name as string
		this.storeService
			.findStoresByName(storeName)
			.then(stores => res.status(200).json({ stores }))
			.catch(err => res.status(500).json({ error: err.message }))
	}
}
