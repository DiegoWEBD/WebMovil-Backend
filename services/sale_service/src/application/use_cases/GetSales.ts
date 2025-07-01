import serviceClient from '../../api/axios/service_client'
import SaleRepository from '../../domain/Sale/SaleRepository.interface'
import { SaleSummary } from '../types/SaleSummary'

export default class GetSales {
	private saleRepository: SaleRepository

	constructor(saleRepository: SaleRepository) {
		this.saleRepository = saleRepository
	}

	async execute(
		storeId: string | undefined,
		userEmail: string | undefined,
		status: string | undefined
	): Promise<SaleSummary[]> {
		if (storeId) {
			// validate store
			await serviceClient.get(`${process.env.STORE_SERVICE_URL}/${storeId}`)
		}

		const sales = await this.saleRepository.find(storeId, userEmail, status)
		return sales.map(sale => ({
			code: sale.getCode() as string,
			userName: sale.getUserName(),
			storeId: sale.getStoreId(),
			storeName: sale.getStoreName(),
			total: sale.getTotal(),
			date: sale.getDate(),
			dispatchMethod: sale.getDispatchMethod(),
			status: sale.getStatus(),
		}))
	}
}
