import Owner from './Owner'

export default interface OwnerRepository {
	getAll(): Promise<Owner[]>
	getByEmail(email: string): Promise<Owner | null>
	add(owner: Owner): Promise<void>
}
