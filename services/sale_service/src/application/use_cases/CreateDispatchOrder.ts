import DeliveryOrder from '../../domain/DispatchOrder/DeliveryOrder'
import Sale from '../../domain/temp_name/Sale'
import SaleRepository from '../../domain/temp_name/SaleRepository.interface'

export default class CreateDispatchOrder {
	private saleRepository: SaleRepository

	constructor(saleRepository: SaleRepository) {
		this.saleRepository = saleRepository
	}

	async execute(saleCode: string): Promise<Sale> {
		const sale = await this.saleRepository.findByCode(saleCode)

		if (!sale) {
			throw new Error(`Venta ${saleCode} no registrada`)
		}

		if (sale.getDispatchOrder()) {
			throw new Error(`La venta ${saleCode} ya tiene una orden de entrega`)
		}

		const dispatchOrder = new DeliveryOrder(
			undefined,
			new Date(),
			1500,
			'Calle Falsa',
			'123',
			'Dejar en la puerta y golpear'
		)

		sale.setDispatchOrder(dispatchOrder)
		await this.saleRepository.updateSale(saleCode, sale)

		return sale
	}
}
