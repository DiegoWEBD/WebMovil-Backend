import { Router } from 'express'
import IUserService from '../application/IUserService.interface'
import UserService from '../application/UserService'
import UserRepository from '../domain/UserRepository.interface'
import MongoUserRepository from '../infrastructure/mongo_repository/MongoUserRepository'
import UserController from './UserController'

const userRepository: UserRepository = new MongoUserRepository()
const userService: IUserService = new UserService(userRepository)
const userController = new UserController(userService)

const router = Router()

router.get('/:email', userController.getUserByEmail)
router.post('/', userController.registerUser)

export default router
