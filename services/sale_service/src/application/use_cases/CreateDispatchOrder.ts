import DeliveryData from '../../domain/DispatchMethod/DeliveryData/DeliveryData'
import PickupData from '../../domain/DispatchMethod/PickupData/PickupData'
import DeliveryOrder from '../../domain/DispatchOrder/DeliveryOrder'
import PickupOrder from '../../domain/DispatchOrder/PickupOrder'
import Sale from '../../domain/Sale/Sale'
import SaleRepository from '../../domain/Sale/SaleRepository.interface'

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

		// Determine dispatch order type based on dispatch method
		const dispatchMethod = sale.getDispatchMethod()
		let dispatchOrder

		if (dispatchMethod && dispatchMethod.type === 'delivery') {
			// Create delivery order
			dispatchOrder = new DeliveryOrder(
				undefined,
				(dispatchMethod as DeliveryData).getStreet(),
				(dispatchMethod as DeliveryData).getNumber(),
				(dispatchMethod as DeliveryData).getCustomerInstructions()
			)
		} else {
			dispatchOrder = new PickupOrder(
				undefined,
				(dispatchMethod as PickupData).getStoreDirection()
			)
		}

		sale.setDispatchOrder(dispatchOrder)
		await this.saleRepository.updateSale(saleCode, sale)

		return sale
	}
}
