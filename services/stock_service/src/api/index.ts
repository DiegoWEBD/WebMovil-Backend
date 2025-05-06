import express from 'express'
import cors from 'cors'
import router from './router'
import authenticateService from './middlewares/service_authentication.middleware'

const app = express()
const port = process.env.PORT || 3003

app.use(cors())
app.use(express.json())

app.use('/', authenticateService, router)

app.listen(port, () => {
	console.log(`StockServiceAPI ejecutándose en el puerto ${port}`)
})
