import User from './User'

export default interface UserRepository {
	getUserByEmail(email: string): Promise<User | null>
	add(user: User): Promise<void>
}
