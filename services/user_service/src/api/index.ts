import cors from 'cors'
import express from 'express'
import router from './router'
import authenticateService from './middlewares/service_authentication.middleware'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', authenticateService, router)

app.listen(3001, () =>
	console.log('UserServiceAPI ejecutándose en el puerto 3001')
)
