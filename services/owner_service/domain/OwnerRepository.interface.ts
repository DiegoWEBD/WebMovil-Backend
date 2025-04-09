import Owner from './Owner'

export default interface OwnerRepository {
	getByEmail(email: string): Promise<Owner | null>
	add(owner: Owner): Promise<void>
}
