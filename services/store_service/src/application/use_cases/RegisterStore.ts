import axios from 'axios'
import Store from '../../domain/Store/Store'
import StoreRepository from '../../domain/Store/StoreRepository.interface'

export default class RegisterStore {
	private storeRepository: StoreRepository

	constructor(storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute(
		name: string,
		description: string,
		direction: string,
		phone: string,
		ownerEmail: string
	): Promise<Store> {
		const similarStores = await this.storeRepository.findByName(name)

		similarStores.forEach(store => {
			if (store.getName() === name) {
				throw new Error(`Nombre de tienda no disponible: ${name}`)
			}
		})

		const ownerEmailEncoded = encodeURIComponent(ownerEmail)
		let existingOwner

		try {
			await axios.get(`http://api-gateway:3000/owners/${ownerEmailEncoded}`)
			existingOwner = true
		} catch (error) {
			existingOwner = false
		}

		if (!existingOwner) {
			throw new Error(
				`El correo ${ownerEmail} no tiene una cuenta de locatario registrada`
			)
		}

		const store = new Store(name, description, direction, phone, [ownerEmail])
		await this.storeRepository.add(store) // El id se agrega automáticamente en el repositorio
		return store
	}
}
