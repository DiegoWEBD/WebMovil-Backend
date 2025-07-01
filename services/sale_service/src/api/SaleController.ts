import { Request, Response } from 'express'
import ISaleService from '../application/ISaleService.interface'
import NewSaleJSON from './types/sale/NewSaleJSON'

export default class SaleController {
	private saleService: ISaleService

	constructor(saleService: ISaleService) {
		this.saleService = saleService

		this.getSales = this.getSales.bind(this)
		this.registerSale = this.registerSale.bind(this)
		this.getSale = this.getSale.bind(this)
		this.createDispatchOrder = this.createDispatchOrder.bind(this)
		this.createDispatch = this.createDispatch.bind(this)
		this.acceptDelivery = this.acceptDelivery.bind(this)
	}

	getSale(req: Request, res: Response): void {
		const saleCode = req.params.code as string

		this.saleService
			.getSale(saleCode)
			.then(sale => res.status(200).json(sale))
			.catch(error => {
				res.status(404).json({
					error: 'Venta no encontrada',
					details: error.message,
				})
			})
	}

	getSales(req: Request, res: Response): void {
		const storeId = req.query.store_id as string | undefined
		const userEmail = req.query.user_email as string | undefined
		const status = req.query.status as string | undefined

		this.saleService
			.getSales(storeId, userEmail, status)
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
			.registerSale(
				newSale.user_email,
				newSale.store_id,
				newSale.products,
				newSale.dispatch_method
			)
			.then(sale => {
				const io = req.app.get('io')
				io.emit('new-sale', sale)
				res.status(201).json(sale)
			})
			.catch(error =>
				res.status(500).json({
					error: 'Error al registrar la venta',
					details: error.message,
				})
			)
	}

	createDispatchOrder(req: Request, res: Response): void {
		this.saleService
			.createDispatchOrder(req.params.code as string)
			.then(sale => {
				res.status(201).json(sale)
			})
			.catch(error =>
				res.status(500).json({
					error: 'Error al crear la orden de entrega',
					details: error.message,
				})
			)
	}

	createDispatch(req: Request, res: Response): void {
		this.saleService
			.createDispatch(req.params.code as string)
			.then(sale => {
				res.status(201).json(sale)
			})
			.catch(error =>
				res.status(500).json({
					error: 'Error al crear el despacho',
					details: error.message,
				})
			)
	}

	acceptDelivery(req: Request, res: Response): void {
		console.log(req.body)
		this.saleService
			.acceptDelivery(req.params.code as string, req.body.delivery_man_email)
			.then(sale => {
				res.status(201).json(sale)
			})
			.catch(error =>
				res.status(500).json({
					error: 'Error al crear el despacho',
					details: error.message,
				})
			)
	}
}
