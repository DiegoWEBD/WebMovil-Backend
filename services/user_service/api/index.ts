import cors from 'cors'
import express from 'express'
import router from './router'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.listen(3001, () =>
	console.log('UserServiceAPI ejecutándose en el puerto 3001')
)
