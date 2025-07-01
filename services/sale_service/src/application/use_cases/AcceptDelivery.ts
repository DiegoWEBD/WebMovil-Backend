import DeliveryDetails from '../../domain/DeliveryDetails/DeliveryDetails'
import Sale from '../../domain/Sale/Sale'
import SaleRepository from '../../domain/Sale/SaleRepository.interface'

export default class AcceptDelivery {
	private saleRepository: SaleRepository

	constructor(saleRepository: SaleRepository) {
		this.saleRepository = saleRepository
	}

	async execute(saleCode: string, deliveryManEmail: string): Promise<Sale> {
		const sale = await this.saleRepository.findByCode(saleCode)

		if (!sale) {
			throw new Error(`Venta ${saleCode} no registrada`)
		}

		if (sale.getDeliveryDetails()) {
			throw new Error(`El delivery ya fue aceptado por otro repartidor`)
		}

		sale.setDeliveryDetails(new DeliveryDetails(deliveryManEmail))
		await this.saleRepository.updateSale(saleCode, sale)
		return sale
	}
}
