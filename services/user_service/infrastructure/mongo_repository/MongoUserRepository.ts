import mongoose from 'mongoose'
import User from '../../domain/User'
import UserRepository from '../../domain/UserRepository.interface'
import UserModel from './UserModel'
import IUserAdapter from '../adapters/IUserAdapter'
import UserModelAdapter from '../adapters/UserModelAdapter'

export default class MongoUserRepository implements UserRepository {
	constructor() {
		mongoose
			.connect(
				'mongodb://admin:secret@mongodb:27017/user_service_db?authSource=admin'
			)
			.then(() => console.log('Base de datos de StockService conectada'))
			.catch(err =>
				console.error(
					'Error al conectar a la base de datos de StockService:',
					err
				)
			)
	}

	async getUserByEmail(email: string): Promise<User | null> {
		const user = await UserModel.findOne({ email })
		return user ? new IUserAdapter(user) : null
	}

	async add(user: User): Promise<void> {
		const newUser = new UserModelAdapter(user)
		await newUser.save()
	}
}
