import Store from '../domain/Store/Store'

export type ScheduleData = {
	day:
		| 'Lunes'
		| 'Martes'
		| 'Miércoles'
		| 'Jueves'
		| 'Viernes'
		| 'Sábado'
		| 'Domingo'
	open: string
	close: string
}

export default interface IStoreService {
	countStores(name: string): Promise<number>
	getStores(
		name: string,
		page: number | undefined,
		limit: number | undefined
	): Promise<Store[] | null>
	getStoreById(id: string): Promise<Store>
	getStoresByOwnerEmail(email: string): Promise<Store[]>
	findStoresByName(name: string): Promise<Store[]>
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
