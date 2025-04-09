import Owner from '../domain/Owner'

export default interface IOwnerService {
	getOwners(): Promise<Owner[]>
	getOwnerByEmail(email: string): Promise<Owner | null>
	registerOwner(
		email: string,
		fullName: string,
		profilePicture: string
	): Promise<Owner>
}
