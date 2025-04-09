import Owner from '../domain/Owner'
import OwnerRepository from '../domain/OwnerRepository.interface'
import IOwnerService from './IOwnerService.interface'
import GetOwnerByEmail from './use_cases/GetOwnerByEmail'
import RegisterOwner from './use_cases/RegisterOwner'

export default class OwnerService implements IOwnerService {
	private ownerRepository: OwnerRepository

	private _getOwnerByEmail: GetOwnerByEmail
	private _registerOwner: RegisterOwner

	constructor(ownerRepository: OwnerRepository) {
		this.ownerRepository = ownerRepository

		this._getOwnerByEmail = new GetOwnerByEmail(this.ownerRepository)
		this._registerOwner = new RegisterOwner(this.ownerRepository)
	}

	async getOwnerByEmail(email: string): Promise<Owner | null> {
		return this._getOwnerByEmail.execute(email)
	}

	async registerOwner(
		email: string,
		fullName: string,
		profilePicture: string
	): Promise<Owner> {
		return this._registerOwner.execute(email, fullName, profilePicture)
	}
}
