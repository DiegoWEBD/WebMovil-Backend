import { Router } from 'express'
import AnalyticsService from '../application/AnalyticsService'
import AnalyticsController from './AnalyticsController'

const analyticsService = new AnalyticsService()
const analyticsController = new AnalyticsController(analyticsService)
const router = Router()

router.get('/stores/best', analyticsController.getBestSellingStores)
router.get('/stores/worst', analyticsController.getWorstSellingStores)

export default router
