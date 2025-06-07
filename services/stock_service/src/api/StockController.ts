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

	async getProducts(req: Request, res: Response): Promise<void> {
		let storeId = req.query.store_id as string | undefined
		let page = parseInt(req.query.page as string)
		let limit = parseInt(req.query.limit as string)
		let product_name = req.query.product_name as string

		storeId = storeId || ''
		page = isNaN(page) ? 1 : page
		limit = isNaN(limit) ? 10 : limit
		product_name = product_name || ''

		const totalProducts = await this.stockService.countProducts(
			storeId,
			product_name
		)

		this.stockService
			.getProducts(storeId, product_name, page, limit)
			.then(products =>
				res.status(200).json({
					meta: {
						total_products: totalProducts,
						current_page: page,
						limit: limit,
						total_pages: Math.ceil(totalProducts / limit),
					},
					products,
				})
			)
			.catch(error => res.status(500).json({ error: error.message }))
	}

	registerProduct(req: Request, res: Response): void {
		const {
			code,
			name,
			description,
			price,
			store_id,
			store_name,
			picture,
			stock,
		} = req.body

		this.stockService
			.registerProduct(
				code,
				name,
				description,
				price,
				store_id,
				store_name,
				picture,
				stock
			)
			.then(product => res.status(201).json(product))
			.catch(error => res.status(500).json({ error: error.message }))
	}
}
