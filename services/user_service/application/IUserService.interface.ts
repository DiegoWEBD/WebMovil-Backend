import User from '../domain/User'

export default interface IUserService {
	getUserByEmail(email: string): Promise<User>
	registerUser(
		email: string,
		fullName: string,
		phone: string,
		profilePicture: string,
		userType: string
	): Promise<User>
}
