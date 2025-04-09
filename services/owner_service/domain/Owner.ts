export default class Owner {
	private email: string
	private fullName: string
	private profilePicture: string

	constructor(email: string, fullName: string, profilePicture: string) {
		this.email = email
		this.fullName = fullName
		this.profilePicture = profilePicture
	}

	getEmail(): string {
		return this.email
	}

	getFullName(): string {
		return this.fullName
	}

	getProfilePicture(): string {
		return this.profilePicture
	}
}
