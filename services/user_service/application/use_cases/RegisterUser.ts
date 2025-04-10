import User from '../../domain/User'
import UserRepository from '../../domain/UserRepository.interface'

export default class RegisterUser {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async execute(
		email: string,
		fullName: string,
		phone: string,
		profilePicture: string,
		userType: string
	): Promise<User> {
		const existingUser = await this.userRepository.getUserByEmail(email)

		if (existingUser) {
			throw new Error('El correo ingresado ya se encuentra registrado.')
		}

		const user = new User(email, fullName, phone, profilePicture, userType)
		await this.userRepository.add(user)

		return user
	}
}
