import SaleRepository from '../../domain/temp_name/SaleRepository.interface'
import { SaleSummary } from '../types/SaleSummary'

export default class GetCustomerPurchases {
	private saleRepository: SaleRepository

	constructor(saleRepository: SaleRepository) {
		this.saleRepository = saleRepository
	}

	async execute(userEmail: string): Promise<SaleSummary[]> {
		return []
	}
}
