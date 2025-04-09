import User from '../domain/User'

export default interface IUserService {
	getUserByEmail(email: string): Promise<User>
	registerUser(email: string, userType: string): Promise<User>
}
