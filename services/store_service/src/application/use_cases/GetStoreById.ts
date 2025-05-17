import Store from '../../domain/Store/Store'
import StoreRepository from '../../domain/Store/StoreRepository.interface'

export default class GetStoreById {
	private storeRepository: StoreRepository

	constructor(storeRepository: StoreRepository) {
		this.storeRepository = storeRepository
	}

	async execute(id: string): Promise<Store> {
		let store: Store | null

		try {
			store = await this.storeRepository.getById(id)
		} catch (error) {
			throw new Error(`No se encontró la tienda (id: ${id})`) // revisar
		}

		if (!store) {
			throw new Error(`No se encontró la tienda (id: ${id})`)
		}

		return store
	}
}
