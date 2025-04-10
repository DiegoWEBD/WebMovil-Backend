import { Router } from 'express'
import StoreService from '../application/StoreService'
import MongoStoreRepository from '../infrastructure/Store/mongo_repository/MongoStoreRepository'
import StoreController from './StoreController'

const storeRepository = new MongoStoreRepository()
const storeService = new StoreService(storeRepository)
const storeController = new StoreController(storeService)
const router = Router()

router.get('/', storeController.getAllStores)
router.post('/', storeController.registerStore)

export default router
