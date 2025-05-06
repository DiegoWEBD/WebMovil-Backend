export default class User {
	private email: string
	private full_name: string
	private phone: string
	private profile_picture: string
	private user_type: string

	constructor(
		email: string,
		fullName: string,
		phone: string,
		profilePicture: string,
		userType: string
	) {
		this.email = email
		this.full_name = fullName
		this.phone = phone
		this.profile_picture = profilePicture
		this.user_type = userType
	}

	getEmail(): string {
		return this.email
	}

	getFullName(): string {
		return this.full_name
	}

	getPhone(): string {
		return this.phone
	}

	getProfilePicture(): string {
		return this.profile_picture
	}

	getUserType(): string {
		return this.user_type
	}
}
