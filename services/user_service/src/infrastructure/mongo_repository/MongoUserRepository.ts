import mongoose from 'mongoose'
import UserModel from './UserModel'
import IUserAdapter from '../adapters/IUserAdapter'
import UserModelAdapter from '../adapters/UserModelAdapter'
import User from '../../domain/User'
import UserRepository from '../../domain/UserRepository.interface'

export default class MongoUserRepository implements UserRepository {
	constructor() {
		mongoose
			.connect(
				'mongodb://admin:secret@mongodb:27017/user_service_db?authSource=admin'
			)
			.then(async () => {
				console.log('Base de datos de StockService conectada')
				/*await UserModel.create({
					email: 'diego.maldonado@alumnos.ucn.cl',
					full_name: 'Diego Maldonado Zamorano',
					phone: '+56947354344',
					profile_picture: 'picture.png',
					user_type: 'client',
				})
				await UserModel.create({
					email: 'diego.maldonado.1alsf@gmail.com',
					full_name: 'Miguel Pérez Jara',
					phone: '+56981840854',
					profile_picture: 'picture.png',
					user_type: 'owner',
				})
				console.log('Usuarios de prueba creados')*/
			})
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
