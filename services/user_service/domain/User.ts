export default class User {
	private email: string
	private user_type: string

	constructor(email: string, userType: string) {
		this.email = email
		this.user_type = userType
	}

	getEmail(): string {
		return this.email
	}

	getUserType(): string {
		return this.user_type
	}
}
