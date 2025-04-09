import Owner from '../../domain/Owner'
import OwnerRepository from '../../domain/OwnerRepository.interface'

export default class GetOwners {
	private ownerRepository: OwnerRepository

	constructor(ownerRepository: OwnerRepository) {
		this.ownerRepository = ownerRepository
	}

	async execute(): Promise<Owner[]> {
		return this.ownerRepository.getAll()
	}
}
