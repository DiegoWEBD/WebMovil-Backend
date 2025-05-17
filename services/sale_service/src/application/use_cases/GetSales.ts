import serviceClient from '../../api/axios/service_client'
import Sale from '../../domain/sale/Sale'
import SaleRepository from '../../domain/sale/SaleRepository.interface'

export default class GetSales {
	private saleRepository: SaleRepository

	constructor(saleRepository: SaleRepository) {
		this.saleRepository = saleRepository
	}

	async execute(storeId: string | undefined): Promise<Sale[]> {
		if (storeId) {
			// validate store
			await serviceClient.get(`${process.env.STORE_SERVICE_URL}/${storeId}`)
		}

		return await this.saleRepository.find(storeId)
	}
}
