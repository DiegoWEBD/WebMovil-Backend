import cors from 'cors'
import express from 'express'
import router from './router'
import authenticateService from './middlewares/service_authentication.middleware'

const app = express()
const port = process.env.PORT || 3008

// Middleware
app.use(cors())
app.use(express.json())

app.use('/', authenticateService, router)

app.listen(port, () => {
	console.log(`Deliveryman service running on port ${port}`)
})
