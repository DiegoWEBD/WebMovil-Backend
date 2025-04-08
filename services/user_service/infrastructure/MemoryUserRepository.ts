import User from '../domain/User'
import UserRepository from '../domain/UserRepository.interface'

export default class MemoryUserRepository implements UserRepository {
	private users: User[]

	constructor() {
		this.users = []
	}

	async getUserByEmail(email: string): Promise<User | null> {
		return this.users.find(user => user.getEmail() === email) || null
	}
	async add(user: User): Promise<void> {
		this.users.push(user)
	}
}
