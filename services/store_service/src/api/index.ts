import cors from 'cors'
import express from 'express'
import router from './router'
import authenticateService from './middlewares/service_authentication.middleware'

const app = express()
const port = process.env.PORT || 3004

app.use(cors())
app.use(express.json())

app.use('/', authenticateService, router)

app.listen(port, () => {
	console.log(`StoreServiceAPI ejecutándose en el puerto ${port}`)
})
