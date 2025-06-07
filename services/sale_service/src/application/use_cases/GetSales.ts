import serviceClient from '../../api/axios/service_client'
import DeliveryOrder from '../../domain/DispatchOrder/DeliveryOrder'
import PickupOrder from '../../domain/DispatchOrder/PickupOrder'
import SaleRepository from '../../domain/Sale/SaleRepository.interface'
import { SaleSummary } from '../types/SaleSummary'

export default class GetSales {
	private saleRepository: SaleRepository

	constructor(saleRepository: SaleRepository) {
		this.saleRepository = saleRepository
	}

	async execute(
		storeId: string | undefined,
		userEmail: string | undefined
	): Promise<SaleSummary[]> {
		if (storeId) {
			// validate store
			await serviceClient.get(`${process.env.STORE_SERVICE_URL}/${storeId}`)
		}

		const sales = await this.saleRepository.find(storeId, userEmail)
		return sales.map(sale => {
			let status = 'Pendiente'
			const dispatch = sale.getDispatch()

			if (dispatch) {
				status = 'Completada'
			} else {
				const dispatchOrder = sale.getDispatchOrder()

				if (dispatchOrder instanceof DeliveryOrder) {
					status = 'En camino'
				} else if (dispatchOrder instanceof PickupOrder) {
					status = 'Lista para retiro'
				}
			}

			return {
				code: sale.getCode() as string,
				userName: sale.getUserName(),
				storeId: sale.getStoreId(),
				storeName: sale.getStoreName(),
				total: sale.getTotal(),
				date: sale.getDate(),
				dispatchMethod: sale.getDispatchMethod(),
				status,
			}
		})
	}
}
