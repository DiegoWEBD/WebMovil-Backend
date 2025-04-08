import cors from 'cors'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

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
	'/users',
	createProxyMiddleware({
		target: 'http://user-service:3001',
		changeOrigin: true,
	})
)

app.listen(PORT, () =>
	console.log(`API Gateway ejecutándose en el puerto ${PORT}`)
)
