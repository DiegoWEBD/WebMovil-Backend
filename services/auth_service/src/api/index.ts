import cors from 'cors'
import express from 'express'
import router from './router'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', router)

app.listen(3006, () =>
	console.log('AuthServiceAPI ejecutándose en el puerto 3006')
)
