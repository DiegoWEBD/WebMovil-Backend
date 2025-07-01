import mongoose from 'mongoose'
import Deliveryman from '../domain/Deliveryman'
import DeliverymanRepository from '../domain/DeliverymanRepository.interface'
import IDeliverymanAdapter from './adapters/IDeliverymanAdapter'
import DeliverymanModelAdapter from './adapters/DeliverymanModelAdapter'
import DeliverymanModel from './mongo_repository/DeliverymanModel'

export default class MongoDeliverymanRepository
	implements DeliverymanRepository
{
	constructor() {
		mongoose
			.connect(
				'mongodb://admin:secret@mongodb:27017/deliveryman_service_db?authSource=admin'
			)
			.then(() =>
				console.log('Conectado a la base de datos de DeliverymanService')
			)
			.catch(err =>
				console.error(
					'Error al conectar a la base de datos de DeliverymanService:',
					err
				)
			)
	}

	async getAll(): Promise<Deliveryman[]> {
		const deliverymen = await DeliverymanModel.find()
		return deliverymen.map(deliveryman => new IDeliverymanAdapter(deliveryman))
	}

	async getByEmail(email: string): Promise<Deliveryman | null> {
		const deliveryman = await DeliverymanModel.findOne({ email })
		if (!deliveryman) return null
		return new IDeliverymanAdapter(deliveryman)
	}

	async add(deliveryman: Deliveryman): Promise<void> {
		const newDeliveryman = new DeliverymanModelAdapter(deliveryman)
		await newDeliveryman.save()
		deliveryman.setId(newDeliveryman._id.toString())
	}
}
