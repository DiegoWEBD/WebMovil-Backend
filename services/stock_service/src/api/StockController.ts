import { Request, Response } from 'express'
import IStockService from '../application/IStockService.interface'

export default class StockController {
	private stockService: IStockService

	constructor(stockService: IStockService) {
		this.stockService = stockService

		this.getProduct = this.getProduct.bind(this)
		this.getProducts = this.getProducts.bind(this)
		this.registerProduct = this.registerProduct.bind(this)
	}

	getProduct(req: Request, res: Response): void {
		const code = req.params.code as string
		const storeId = req.query.store_id as string | undefined

		this.stockService
			.getProduct(code, storeId)
			.then(product => res.status(200).json(product))
			.catch(error => res.status(500).json({ error: error.message }))
	}

	getProducts(req: Request, res: Response): void {
		const storeId = req.query.store_id as string | undefined
		this.stockService
			.getProducts(storeId)
			.then(products => res.status(200).json(products))
			.catch(error => res.status(500).json({ error: error.message }))
	}

	registerProduct(req: Request, res: Response): void {
		if (Array.isArray(req.body)) {
			this.registerProducts(req, res)
			return
		}

		const { code, name, description, price, store_id, picture, stock } =
			req.body

		this.stockService
			.registerProduct(code, name, description, price, store_id, picture, stock)
			.then(product => res.status(201).json(product))
			.catch(error => res.status(500).json({ error: error.message }))
	}

	registerProducts(req: Request, res: Response): void {
		const products = req.body

		this.stockService
			.registerProducts(products)
			.then(registeredProducts => res.status(201).json(registeredProducts))
			.catch(error => res.status(500).json({ error: error.message }))
	}
}
