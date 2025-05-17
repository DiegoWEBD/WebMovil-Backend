import axios from 'axios'

// Token cache
type TokenCache = { value: string; expiresAt: number }
const tokenCache: TokenCache = { value: '', expiresAt: 0 }

const serviceClient = axios.create({
	baseURL: 'http://',
})

serviceClient.interceptors.request.use(async config => {
	let serviceToken: string

	if (Date.now() < tokenCache.expiresAt - 20000) {
		config.headers['x-service-authorization'] = `Bearer ${tokenCache.value}`
		return config
	}

	const tokenResponse = await axios.post(
		`${process.env.TOKEN_SERVICE_URL}/token`,
		{
			grant_type: 'client_credentials',
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
		}
	)
	tokenCache.value = tokenResponse.data.access_token
	tokenCache.expiresAt = Date.now() + tokenResponse.data.expires_in * 1000
	serviceToken = tokenResponse.data.access_token

	config.headers['x-service-authorization'] = `Bearer ${serviceToken}`
	return config
})

export default serviceClient
