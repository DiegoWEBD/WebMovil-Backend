import IGoogleAuthService from './IGoogleAuthService.interface'
import BasicUserInfo from './types/BasicUserInfo'
import Register from './use_cases/Register'
import Validate from './use_cases/Validate'

export default class GoogleAuthService implements IGoogleAuthService {
	private _validate: Validate
	private _register: Register

	constructor() {
		this._validate = new Validate()
		this._register = new Register()
	}

	validate(googleAccessToken: string): Promise<any> {
		return this._validate.execute(googleAccessToken)
	}

	register(
		googleAccessToken: string,
		phone: string,
		fullName: string,
		profilePicture: string,
		userType: string
	): Promise<BasicUserInfo> {
		return this._register.execute(
			googleAccessToken,
			phone,
			fullName,
			profilePicture,
			userType
		)
	}
}
