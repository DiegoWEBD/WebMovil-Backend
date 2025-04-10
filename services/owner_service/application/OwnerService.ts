import Owner from '../domain/Owner'
import OwnerRepository from '../domain/OwnerRepository.interface'
import IOwnerService from './IOwnerService.interface'
import GetOwnerByEmail from './use_cases/GetOwnerByEmail'
import GetOwners from './use_cases/GetOwners'
import RegisterOwner from './use_cases/RegisterOwner'

export default class OwnerService implements IOwnerService {
	private _getOwners: GetOwners
	private _getOwnerByEmail: GetOwnerByEmail
	private _registerOwner: RegisterOwner

	constructor(ownerRepository: OwnerRepository) {
		this._getOwners = new GetOwners(ownerRepository)
		this._getOwnerByEmail = new GetOwnerByEmail(ownerRepository)
		this._registerOwner = new RegisterOwner(ownerRepository)
	}

	async getOwners(): Promise<Owner[]> {
		return this._getOwners.execute()
	}

	async getOwnerByEmail(email: string): Promise<Owner> {
		return this._getOwnerByEmail.execute(email)
	}

	async registerOwner(
		email: string,
		phone: string,
		fullName: string,
		profilePicture: string
	): Promise<Owner> {
		return this._registerOwner.execute(email, phone, fullName, profilePicture)
	}
}
