import Sale from '../../domain/temp_name/Sale'
import SaleRepository from '../../domain/temp_name/SaleRepository.interface'

export default class GetSale {
	private saleRepository: SaleRepository

	constructor(saleRepository: SaleRepository) {
		this.saleRepository = saleRepository
	}

	async execute(saleCode: string): Promise<Sale> {
		const sale = await this.saleRepository.findByCode(saleCode)

		if (!sale) {
			throw new Error(`Venta ${saleCode} no registrada`)
		}

		return sale
	}
}
