import User from '../../domain/Owner'
import OwnerRepository from '../../domain/OwnerRepository.interface'

export default class GetOwnerByEmail {
	private ownerRepository: OwnerRepository

	constructor(ownerRepository: OwnerRepository) {
		this.ownerRepository = ownerRepository
	}

	async execute(email: string): Promise<User> {
		const owner = await this.ownerRepository.getByEmail(email)

		if (!owner) {
			throw new Error(`Locatario no registrado: ${email}`)
		}

		return owner
	}
}
