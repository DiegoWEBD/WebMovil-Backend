import NewSaleProductJSON from '../api/types/sale/NewSaleProductJSON'
import Sale from '../domain/Sale/Sale'
import SaleRepository from '../domain/Sale/SaleRepository.interface'
import ISaleService from './ISaleService.interface'
import { SaleSummary } from './types/SaleSummary'
import CreateDispatchOrder from './use_cases/CreateDispatchOrder'
import GetSale from './use_cases/GetSale'
import GetSales from './use_cases/GetSales'
import RegisterSale from './use_cases/RegisterSale'

export default class SaleService implements ISaleService {
	private _registerSale: RegisterSale
	private _getSales: GetSales
	private _getSale: GetSale
	private _createDispatchOrder: CreateDispatchOrder

	constructor(saleRepository: SaleRepository) {
		this._getSales = new GetSales(saleRepository)
		this._registerSale = new RegisterSale(saleRepository)
		this._getSale = new GetSale(saleRepository)
		this._createDispatchOrder = new CreateDispatchOrder(saleRepository)
	}

	getSale(code: string): Promise<Sale> {
		return this._getSale.execute(code)
	}

	getSales(storeId: string | undefined): Promise<SaleSummary[]> {
		return this._getSales.execute(storeId)
	}

	registerSale(
		user_email: string,
		store_id: string,
		products: NewSaleProductJSON[],
		dispatchMethod: 'delivery' | 'pickup'
	): Promise<Sale> {
		return this._registerSale.execute(
			user_email,
			store_id,
			products,
			dispatchMethod
		)
	}

	createDispatchOrder(saleCode: string): Promise<Sale> {
		return this._createDispatchOrder.execute(saleCode)
	}
}
