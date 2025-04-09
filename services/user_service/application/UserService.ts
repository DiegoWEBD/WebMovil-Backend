import User from '../domain/User'
import UserRepository from '../domain/UserRepository.interface'
import IUserService from './IUserService.interface'
import GetUserByEmail from './use_cases/GetUserByEmail'
import RegisterUser from './use_cases/RegisterUser'

export default class UserService implements IUserService {
	private userRepository: UserRepository

	private _getUserByEmail: GetUserByEmail
	private _registerUser: RegisterUser

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository

		this._getUserByEmail = new GetUserByEmail(this.userRepository)
		this._registerUser = new RegisterUser(this.userRepository)
	}

	async getUserByEmail(email: string): Promise<User> {
		return this._getUserByEmail.execute(email)
	}

	async registerUser(
		email: string,
		fullName: string,
		profilePicture: string
	): Promise<User> {
		return this._registerUser.execute(email, fullName, profilePicture)
	}
}
