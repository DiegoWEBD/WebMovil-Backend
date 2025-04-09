import { Router } from 'express'
import IOwnerService from '../application/IOwnerService.interface'
import OwnerService from '../application/OwnerService'
import OwnerRepository from '../domain/OwnerRepository.interface'
import MongoOwnerRepository from '../infrastructure/mongo_repository/MongoOwnerRepository'
import OwnerController from './OwnerController'

const ownerRepository: OwnerRepository = new MongoOwnerRepository()
const ownerService: IOwnerService = new OwnerService(ownerRepository)
const ownerController = new OwnerController(ownerService)

const router = Router()

router.get('/', ownerController.getOwners)
router.get('/:email', ownerController.getOwnerByEmail)
router.post('/', ownerController.registerOwner)

export default router
