export default class Owner {
	private email: string

	constructor(email: string) {
		this.email = email
	}

	getEmail(): string {
		return this.email
	}
}
