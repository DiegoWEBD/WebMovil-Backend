import Store from './Store'

export default interface StoreRepository {
	count(): Promise<number>
	add(store: Store): Promise<void>
	get(skip: number, limit: number): Promise<Store[]>
	getById(id: string): Promise<Store | null>
	getByOwnerEmail(email: string): Promise<Store[]>
	findByName(name: string): Promise<Store[]>
}
