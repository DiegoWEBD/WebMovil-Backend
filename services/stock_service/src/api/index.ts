import express from 'express'
import cors from 'cors'
import router from './router'

const app = express()
const port = process.env.PORT || 3003

app.use(cors())
app.use(express.json())

app.use('/', router)

app.listen(port, () => {
	console.log(`StockServiceAPI ejecutándose en el puerto ${port}`)
})
