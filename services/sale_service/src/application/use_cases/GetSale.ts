import Sale from '../../domain/sale/Sale'
import SaleRepository from '../../domain/sale/SaleRepository.interface'

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
