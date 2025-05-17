import cors from 'cors'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { authMiddleware as userAuthMiddleware } from './middlewares/authentication.middleware'
import { authenticateApiGateway } from './middlewares/authenticate_api_gateway.middleware'
import createSecuredHttpProxy from './proxies/secured_http_proxy'

const PORT = 3000
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (_, res) => {
	res.status(200).json({
		message: 'API de gestión de ventas vecinal.',
	})
})

// Investigar seguridad de esta ruta
app.use(
	'/stores_portraits',
	express.static(path.join(__dirname, './public/stores_portraits'))
)

app.use('/auth', createSecuredHttpProxy('http://auth-service:3006'))
app.use('/users', createSecuredHttpProxy('http://user-service:3001'))

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
	createSecuredHttpProxy('http://stock-service:3003')
)

app.use(
	'/stores',
	userAuthMiddleware,
	createSecuredHttpProxy('http://store-service:3004')
)

app.use(
	'/owners',
	userAuthMiddleware,
	createSecuredHttpProxy('http://owner-service:3005')
)

app.use(
	'/sales',
	userAuthMiddleware,
	createSecuredHttpProxy('http://sale-service:3007')
)

app.listen(PORT, () =>
	console.log(`API Gateway ejecutándose en el puerto ${PORT}`)
)
