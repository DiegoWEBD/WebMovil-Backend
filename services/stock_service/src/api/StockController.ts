import { Request, Response } from 'express'
import StockService from '../application/StockService'

export default class StockController {
	private stockService: StockService

	constructor(stockService: StockService) {
		this.stockService = stockService

		this.getProducts = this.getProducts.bind(this)
		this.registerProduct = this.registerProduct.bind(this)
	}

	getProducts(_: Request, res: Response): void {
		this.stockService
			.getProducts()
			.then(products => res.status(200).json(products))
			.catch(error => res.status(500).json({ error: error.message }))
	}

	registerProduct(req: Request, res: Response): void {
		const { code, name, description, price, store_id } = req.body

		this.stockService
			.registerProduct(code, name, description, price, store_id)
			.then(product => res.status(201).json(product))
			.catch(error => res.status(500).json({ error: error.message }))
	}
}
