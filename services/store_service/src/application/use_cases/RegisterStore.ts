import Schedule from '../../domain/Schedule/Schedule'
import Store from '../../domain/Store/Store'
import StoreRepository from '../../domain/Store/StoreRepository.interface'
import serviceClient from '../../infrastructure/axios/service_client'
import ScheduleData from '../types/ScheduleData'

export default class RegisterStore {
	private storeRepository: StoreRepository

	constructor(storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute(
		name: string,
		description: string,
		about: string,
		direction: string,
		phone: string,
		email: string,
		schedules: ScheduleData[],
		ownerEmail: string,
		imageName: string | undefined
	): Promise<Store> {
		const existingStore = await this.storeRepository.findByName(name)

		if (existingStore) {
			throw new Error(`Nombre de tienda no disponible: ${name}`)
		}

		const ownerEmailEncoded = encodeURIComponent(ownerEmail)
		let existingOwner

		try {
			await serviceClient.get(`/owner-service:3005/${ownerEmailEncoded}`)
			existingOwner = true
		} catch (error) {
			existingOwner = false
		}

		if (!existingOwner) {
			throw new Error(
				`El correo ${ownerEmail} no tiene una cuenta de locatario registrada`
			)
		}

		const store = new Store(
			name,
			description,
			about,
			direction,
			phone,
			email,
			schedules.map(
				schedule => new Schedule(schedule.day, schedule.open, schedule.close)
			),
			[ownerEmail],
			imageName
		)
		await this.storeRepository.add(store) // El id se agrega automáticamente en el repositorio
		return store
	}
}
