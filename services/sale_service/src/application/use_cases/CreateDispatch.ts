import Dispatch from '../../domain/Dispatch/Dispatch'
import Sale from '../../domain/Sale/Sale'
import SaleRepository from '../../domain/Sale/SaleRepository.interface'

export default class CreateDispatch {
	private saleRepository: SaleRepository

	constructor(saleRepository: SaleRepository) {
		this.saleRepository = saleRepository
	}

	async execute(saleCode: string): Promise<Sale> {
		const sale = await this.saleRepository.findByCode(saleCode)

		if (!sale) {
			throw new Error(`Venta ${saleCode} no registrada`)
		}

		if (sale.getDispatch()) {
			throw new Error(`La venta ${saleCode} ya tiene un despacho`)
		}

		const dispatch = new Dispatch(new Date())
		sale.setDispatch(dispatch)
		await this.saleRepository.updateSale(saleCode, sale)

		return sale
	}
}
