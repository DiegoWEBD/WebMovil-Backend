import cors from 'cors'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { authMiddleware as userAuthMiddleware } from './middlewares/auhtentication.middleware'
import { authenticateApiGateway } from './middlewares/authenticate_api_gateway.middleware'

const PORT = 3000
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (_, res) => {
	res.status(200).json({
		message: 'API de gestión de ventas vecinal.',
	})
})

app.use(
	'/stores_portraits',
	express.static(path.join(__dirname, './public/stores_portraits'))
)

app.use(
	'/users',
	authenticateApiGateway,
	createProxyMiddleware({
		target: 'http://user-service:3001',
		changeOrigin: true,
	})
)

app.use(
	'/shipping',
	userAuthMiddleware,
	authenticateApiGateway,
	createProxyMiddleware({
		target: 'http://shipping-service:3002',
		changeOrigin: true,
		ws: true,
	})
)

app.use(
	'/stock',
	userAuthMiddleware,
	authenticateApiGateway,
	createProxyMiddleware({
		target: 'http://stock-service:3003',
		changeOrigin: true,
	})
)

app.use(
	'/stores',
	userAuthMiddleware,
	authenticateApiGateway,
	createProxyMiddleware({
		target: 'http://store-service:3004',
		changeOrigin: true,
	})
)

app.use(
	'/owners',
	userAuthMiddleware,
	authenticateApiGateway,
	createProxyMiddleware({
		target: 'http://owner-service:3005',
		changeOrigin: true,
	})
)

app.use(
	'/auth',
	authenticateApiGateway,
	createProxyMiddleware({
		target: 'http://auth-service:3006',
		changeOrigin: true,
	})
)

app.listen(PORT, () =>
	console.log(`API Gateway ejecutándose en el puerto ${PORT}`)
)
