import express from 'express'
import { createServer } from 'http'
import authenticateService from './middlewares/service_authentication.middleware'
import router from './router'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3009

app.use(express.json())
app.use(cors())

const httpServer = createServer(app)

app.set('io', null)

app.use('/', authenticateService, router)

httpServer.listen(port, () => {
	console.log(`AnalyticsServiceAPI ejecutándose en el puerto ${port}`)
})
