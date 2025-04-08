import { Router } from 'express'
import StockService from '../application/StockService'
import MongoProductRepository from '../infrastructure/Product/mongo_repository/MongoProductRepository'
import StockController from './StockController'

const productRepository = new MongoProductRepository()
const stockService = new StockService(productRepository)
const stockController = new StockController(stockService)

const router = Router()

router.get('/', stockController.getProducts)
router.post('/', stockController.registerProduct)

export default router
