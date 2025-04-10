import Store from './Store'

export default interface StoreRepository {
	add(store: Store): Promise<void>
	getAll(): Promise<Store[]>
	getById(id: string): Promise<Store | null>
	getByOwnerEmail(email: string): Promise<Store[]>
	findByName(name: string): Promise<Store[]>
}
