import User from '../../domain/User'
import UserRepository from '../../domain/UserRepository.interface'

export default class RegisterUser {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async execute(email: string, userType: string): Promise<User> {
		const existingUser = await this.userRepository.getUserByEmail(email)

		if (existingUser) {
			throw new Error('El correo ingresado ya se encuentra registrado.')
		}

		const user = new User(email, userType)
		await this.userRepository.add(user)

		return user
	}
}
