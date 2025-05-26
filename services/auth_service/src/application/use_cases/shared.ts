import axios from 'axios'

export const validateGoogleAccessToken = async (
	googleAccessToken: string
): Promise<void> => {
	const googleTokenResponse = await axios.get(
		`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${googleAccessToken}`
	)

	if (googleTokenResponse.data.aud !== process.env.GOOGLE_CLIENT_ID) {
		throw new Error('Google no ha podido validar su identidad')
	}
}

export const getGoogleUserEmail = async (
	googleAccessToken: string
): Promise<string> => {
	const { data } = await axios.get(
		'https://www.googleapis.com/oauth2/v3/userinfo',
		{
			headers: {
				Authorization: `Bearer ${googleAccessToken}`,
			},
		}
	)

	return data.email
}

export const getGoogleUserInfo = async (
	googleAccessToken: string
): Promise<GoogleUserInfo> => {
	const { data } = await axios.get(
		'https://www.googleapis.com/oauth2/v3/userinfo',
		{
			headers: {
				Authorization: `Bearer ${googleAccessToken}`,
			},
		}
	)

	return {
		email: data.email,
		name: data.name,
	}
}

export type GoogleUserInfo = {
	name: string
	email: string
}
