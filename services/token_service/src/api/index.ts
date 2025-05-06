import express from 'express'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

// Load RSA private key
const PRIVATE_KEY = fs.readFileSync(
	path.join(__dirname, './keys/private.pem'),
	'utf8'
)

/**
 * Registro de clientes en memoria.
 * Falta implementar una base de datos o un sistema de almacenamiento persistente.
 */

const clients: Record<string, { secret: string; scopes: string[] }> = {
	gateway: {
		secret: process.env.GATEWAY_SECRET || 'gateway-secret',
		scopes: ['shipping.read', 'stock.read'],
	},
	reporter: {
		secret: process.env.REPORTER_SECRET || 'reporter-secret',
		scopes: ['reports.generate'],
	},
	'1ddhs753g': {
		secret: 'secret1',
		scopes: ['shipping.read', 'stock.read'],
	},
}

app.post('/oauth2/token', (req, res) => {
	const { grant_type, client_id, client_secret } = req.body

	if (grant_type !== 'client_credentials') {
		res.status(400).json({ error: 'Unsupported grant_type' })
		return
	}

	const client = clients[client_id]

	if (!client || client.secret !== client_secret) {
		res.status(401).json({
			error: 'Usted no posee los permisos para acceder a este recurso',
		})
		return
	}

	const now = Math.floor(Date.now() / 1000)
	const payload = {
		iss: 'https://auth.internal.local/',
		sub: client_id,
		aud: 'microservices',
		iat: now,
		exp: now + 300, // 5 minutos
		scope: client.scopes.join(' '),
	}

	const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' })
	res.json({ access_token: token, token_type: 'Bearer', expires_in: 300 })
})

app.get('/oauth2/validate', (req, res) => {
	if (!req.headers['x-service-authorization']) {
		res.status(401).json({
			error: 'Usted no posee los permisos para acceder a este recurso',
		})
		return
	}

	const authorizationHeader: string = req.headers[
		'x-service-authorization'
	] as string
	const accessToken = authorizationHeader.split(' ')[1]

	jwt.verify(
		accessToken,
		PRIVATE_KEY,
		{
			algorithms: ['RS256'],
			audience: 'microservices',
			issuer: 'https://auth.internal.local/',
		},
		(err, decoded) => {
			if (err) {
				res.status(401).json({
					error: 'Usted no posee los permisos para acceder a este recurso',
				})
				return
			}

			res.json({ valid: true, decoded })
		}
	)
})

app.listen(4000, () =>
	console.log('TokenServiceApi ejecutándose en el puerto 4000')
)
