import { Router } from 'express'
import DeliverymanService from '../application/DeliverymanService'
import MongoDeliverymanRepository from '../infrastructure/MongoDeliverymanRepository'
import DeliverymanController from './DeliverymanController'

const router = Router()

const deliverymanRepository = new MongoDeliverymanRepository()
const deliverymanService = new DeliverymanService(deliverymanRepository)
const deliverymanController = new DeliverymanController(deliverymanService)

router.get('/', deliverymanController.getDeliverymen)
router.get('/:email', deliverymanController.getDeliverymanByEmail)
router.post('/', deliverymanController.registerDeliveryman)

export default router
