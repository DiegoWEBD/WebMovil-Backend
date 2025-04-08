import User from '../domain/User'

export default interface IUserService {
	getUserByEmail(email: string): Promise<User | null>
	registerUser(
		email: string,
		fullName: string,
		profilePicture: string
	): Promise<User>
}
