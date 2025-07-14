import { Request, Response } from 'express'
import IAnalyticsService from '../application/IAnalyticsService.interface'

export default class AnalyticsController {
	private analyticsService: IAnalyticsService

	constructor(analyticsService: IAnalyticsService) {
		this.analyticsService = analyticsService

		this.getBestSellingStores = this.getBestSellingStores.bind(this)
		this.getWorstSellingStores = this.getWorstSellingStores.bind(this)
	}

	getBestSellingStores(req: Request, res: Response): void {
		this.analyticsService
			.getBestSellingStores()
			.then(stores => res.status(200).json(stores))
			.catch(error => {
				res.status(500).json({
					error: 'Error al obtener las mejores tiendas',
					details: error.message,
				})
			})
	}

	getWorstSellingStores(req: Request, res: Response): void {
		this.analyticsService
			.getWorstSellingStores()
			.then(stores => res.status(200).json(stores))
			.catch(error => {
				res.status(500).json({
					error: 'Error al obtener las peores tiendas',
					details: error.message,
				})
			})
	}
}
