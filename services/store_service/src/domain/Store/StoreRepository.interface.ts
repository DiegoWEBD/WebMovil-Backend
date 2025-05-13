import OwnerStoreSummary from '../../application/types/OwnerStoreSummary'
import Store from './Store'

export default interface StoreRepository {
	count(name: string): Promise<number>
	add(store: Store): Promise<void>
	get(name: string, skip: number, limit: number): Promise<Store[]>
	getById(id: string): Promise<Store | null>
	getByOwnerEmail(email: string): Promise<OwnerStoreSummary[]>
	findByName(name: string): Promise<Store | null>
}
