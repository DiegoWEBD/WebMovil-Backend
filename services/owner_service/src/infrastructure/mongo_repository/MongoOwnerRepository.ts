import mongoose from 'mongoose'
import Owner from '../../domain/Owner'
import OwnerRepository from '../../domain/OwnerRepository.interface'
import OwnerModel from './OwnerModel'
import IOwnerAdapter from '../adapters/IOwnerAdapter'
import OwnerModelAdapter from '../adapters/OwnerModelAdapter'

export default class MongoOwnerRepository implements OwnerRepository {
	constructor() {
		mongoose
			.connect(
				'mongodb://admin:secret@mongodb:27017/owner_service_db?authSource=admin'
			)
			.then(() => console.log('Base de datos de OwnerService conectada'))
			.catch(err =>
				console.error(
					'Error al conectar a la base de datos de OwnerService:',
					err
				)
			)
	}

	async getAll(): Promise<Owner[]> {
		const owners = await OwnerModel.find()
		return owners.map(owner => new IOwnerAdapter(owner))
	}

	async getByEmail(email: string): Promise<Owner | null> {
		const owner = await OwnerModel.findOne({ email })
		return owner ? new IOwnerAdapter(owner) : null
	}

	async add(owner: Owner): Promise<void> {
		const newOwner = new OwnerModelAdapter(owner)
		await newOwner.save()
	}
}
