import { Router } from 'express'
import SaleService from '../application/SaleService'
import MongoSaleRepository from '../infrastructure/Sale/mongo_repository/MongoSaleRepository'
import SaleController from './SaleController'

const saleRepository = new MongoSaleRepository()
const saleService = new SaleService(saleRepository)
const saleController = new SaleController(saleService)
const router = Router()

router.get('/', saleController.getSales)
router.get('/:code', saleController.getSale)
router.post('/', saleController.registerSale)
router.post('/:code/dispatch-order', saleController.createDispatchOrder)
router.post('/:code/dispatch', saleController.createDispatch)
router.post('/:code/accept-delivery', saleController.acceptDelivery)

export default router
