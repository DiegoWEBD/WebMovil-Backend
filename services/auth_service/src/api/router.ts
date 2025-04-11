import { Router } from 'express'
import AuthController from './AuthController'
import GoogleAuthService from '../application/GoogleAuthService'

const authService = new GoogleAuthService()
const authController = new AuthController(authService)

const router = Router()

router.get('/validate', authController.validate)
router.post('/register', authController.register)

export default router
