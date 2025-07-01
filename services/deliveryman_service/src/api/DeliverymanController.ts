import { Request, Response } from 'express'
import IDeliverymanService from '../application/IDeliverymanService.interface'

export default class DeliverymanController {
	private deliverymanService: IDeliverymanService

	constructor(deliverymanService: IDeliverymanService) {
		this.deliverymanService = deliverymanService

		this.getDeliverymen = this.getDeliverymen.bind(this)
		this.getDeliverymanByEmail = this.getDeliverymanByEmail.bind(this)
		this.registerDeliveryman = this.registerDeliveryman.bind(this)
	}

	getDeliverymen(req: Request, res: Response): void {
		this.deliverymanService
			.getDeliverymen()
			.then(deliverymen => {
				res.status(200).json(deliverymen)
			})
			.catch(error =>
				res.status(500).json({
					error: 'Error al obtener los repartidores',
					details: error.message,
				})
			)
	}

	getDeliverymanByEmail(req: Request, res: Response): void {
		this.deliverymanService
			.getDeliverymanByEmail(req.params.email as string)
			.then(deliveryman => {
				if (!deliveryman) {
					res.status(404).json({
						error: 'Repartidor no encontrado',
					})
					return
				}
				res.status(200).json(deliveryman)
			})
			.catch(error =>
				res.status(500).json({
					error: 'Error al obtener el repartidor',
					details: error.message,
				})
			)
	}

	registerDeliveryman(req: Request, res: Response): void {
		const { email, full_name, phone, vehicle_type, vehicle_plate } = req.body
		console.log(req.body)

		if (!email || !full_name || !phone || !vehicle_type || !vehicle_plate) {
			res.status(400).json({
				error: 'Todos los campos son requeridos',
			})
			return
		}

		this.deliverymanService
			.registerDeliveryman(email, full_name, phone, vehicle_type, vehicle_plate)
			.then(deliveryman => {
				res.status(201).json(deliveryman)
			})
			.catch(error =>
				res.status(500).json({
					error: 'Error al registrar el repartidor',
					details: error.message,
				})
			)
	}
}
