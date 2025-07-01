import axios from 'axios'

let serviceToken: string | undefined = undefined

const serviceClient = axios.create({
	baseURL: 'http://',
})

serviceClient.interceptors.request.use(async config => {
	if (!serviceToken) {
		const tokenResponse = await axios.post(
			'http://token-service:4000/oauth2/token',
			{
				grant_type: 'client_credentials',
				client_id: process.env.CLIENT_ID,
				client_secret: process.env.CLIENT_SECRET,
			}
		)
		serviceToken = tokenResponse.data.access_token
	}

	config.headers = config.headers || {}
	config.headers['x-service-authorization'] = `Bearer ${serviceToken}`

	return config
})

export default serviceClient
