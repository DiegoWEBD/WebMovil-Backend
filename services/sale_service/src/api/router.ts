import { Router } from 'express'
import MongoSaleRepository from '../infrastructure/sale/mongo_repository/MongoSaleRepository'
import SaleService from '../application/SaleService'
import SaleController from './SaleController'

const saleRepository = new MongoSaleRepository()
const saleService = new SaleService(saleRepository)
const saleController = new SaleController(saleService)
const router = Router()

router.get('/', saleController.getSales)
router.get('/:code', saleController.getSale)
router.post('/', saleController.registerSale)

export default router
