import Store from '../domain/Store/Store'
import OwnerStoreSummary from './types/OwnerStoreSummary'
import ScheduleData from './types/ScheduleData'
import StoreSummary from './types/StoreSummary.interface'

export default interface IStoreService {
	countStores(name: string): Promise<number>
	getStores(
		name: string,
		page: number | undefined,
		limit: number | undefined
	): Promise<StoreSummary[]>
	getStoreById(id: string): Promise<Store>
	getStoresByOwnerEmail(email: string): Promise<OwnerStoreSummary[]>
	registerStore(
		name: string,
		description: string,
		about: string,
		direction: string,
		phone: string,
		email: string,
		schedules: ScheduleData[],
		ownerEmail: string,
		imageName: string | undefined
	): Promise<Store>
}
