import NewSaleProductJSON from '../api/types/sale/NewSaleProductJSON'
import Sale from '../domain/sale/Sale'
import SaleRepository from '../domain/sale/SaleRepository.interface'
import ISaleService from './ISaleService.interface'
import GetSales from './use_cases/GetSales'
import RegisterSale from './use_cases/RegisterSale'

export default class SaleService implements ISaleService {
	private _registerSale: RegisterSale
	private _getSales: GetSales

	constructor(saleRepository: SaleRepository) {
		this._getSales = new GetSales(saleRepository)
		this._registerSale = new RegisterSale(saleRepository)
	}

	getSales(storeId: string | undefined): Promise<Sale[]> {
		return this._getSales.execute(storeId)
	}

	registerSale(
		user_email: string,
		store_id: string,
		products: NewSaleProductJSON[]
	): Promise<Sale> {
		return this._registerSale.execute(user_email, store_id, products)
	}
}
