import User from '../../domain/User'
import UserRepository from '../../domain/UserRepository.interface'

export default class GetUserByEmail {
	private userRepository: UserRepository

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository
	}

	async execute(email: string): Promise<User | null> {
		const user = await this.userRepository.getUserByEmail(email)

		if (!user) {
			throw new Error('El correo ingresado no se encuentra registrado.')
		}

		return user
	}
}
