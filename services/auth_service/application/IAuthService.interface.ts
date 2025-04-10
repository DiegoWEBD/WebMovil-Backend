import BasicUserInfo from '../domain/BasicUserInfo'

export default interface IGoogleAuthService {
	login(googleAccessToken: string): Promise<BasicUserInfo>
	register(
		googleAccessToken: string,
		phone: string,
		fullName: string,
		profilePicture: string
	): Promise<BasicUserInfo>
}
