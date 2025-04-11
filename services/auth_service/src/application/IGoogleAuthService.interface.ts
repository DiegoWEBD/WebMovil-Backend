export default interface IGoogleAuthService {
	validate(googleAccessToken: string): Promise<any>
	register(
		googleAccessToken: string,
		phone: string,
		fullName: string,
		profilePicture: string,
		userType: string
	): Promise<string>
}
