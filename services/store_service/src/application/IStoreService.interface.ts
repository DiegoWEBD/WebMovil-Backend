import Store from '../domain/Store/Store'

export default interface IStoreService {
	getStores(): Promise<Store[] | null>
	getStoreById(id: string): Promise<Store>
	getStoresByOwnerEmail(email: string): Promise<Store[]>
	findStoresByName(name: string): Promise<Store[]>
	registerStore(
		name: string,
		description: string,
		direction: string,
		phone: string,
		ownerEmail: string
	): Promise<Store>
}
