import express from 'express'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import authenticateService from './middlewares/service_authentication.middleware'
import router from './router'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3007

app.use(express.json())
app.use(cors())

const httpServer = createServer(app)
const io = new SocketIOServer(httpServer, {
	cors: {
		origin: '*',
	},
})

app.set('io', io)

app.use('/', authenticateService, router)

httpServer.listen(port, () => {
	console.log(`SaleServiceAPI ejecutándose en el puerto ${port}`)
})
