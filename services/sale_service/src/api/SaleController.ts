import { Request, Response } from 'express'
import ISaleService from '../application/ISaleService.interface'
import NewSaleJSON from './types/sale/NewSaleJSON'

export default class SaleController {
	private saleService: ISaleService

	constructor(saleService: ISaleService) {
		this.saleService = saleService

		this.getSales = this.getSales.bind(this)
		this.registerSale = this.registerSale.bind(this)
	}

	getSales(req: Request, res: Response): void {
		const storeId = req.query.store_id as string | undefined
		this.saleService
			.getSales(storeId)
			.then(sales => res.status(200).json(sales))
			.catch(error => {
				res.status(500).json({
					error: 'Error al obtener las ventas',
					details: error.message,
				})
			})
	}

	registerSale(req: Request, res: Response): void {
		const newSale = req.body as NewSaleJSON

		this.saleService
			.registerSale(newSale.user_email, newSale.store_id, newSale.products)
			.then(sale => res.status(201).json(sale))
			.catch(error =>
				res.status(500).json({
					error: 'Error al registrar la venta',
					details: error.message,
				})
			)
	}
}
