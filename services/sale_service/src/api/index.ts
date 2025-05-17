import express from 'express'
import authenticateService from './middlewares/service_authentication.middleware'
import router from './router'

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use('/', authenticateService, router)

app.listen(port, () => {
	console.log(`SaleServiceAPI ejecutándose en el puerto ${port}`)
})
