import cors from 'cors'
import express from 'express'
import router from './router'
import authenticateService from './middlewares/service_authentication.middleware'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', authenticateService, router)

app.listen(3006, () =>
	console.log('AuthServiceAPI ejecutándose en el puerto 3006')
)
