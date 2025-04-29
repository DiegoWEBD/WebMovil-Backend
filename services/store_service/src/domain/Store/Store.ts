import Schedule from '../Schedule/Schedule'

export default class Store {
	private id: string | undefined
	private name: string
	private description: string
	private about: string
	private direction: string
	private phone: string
	private email: string
	private schedules: Schedule[]
	private owners_emails: string[]
	private image_name: string | undefined

	constructor(
		name: string,
		description: string,
		about: string,
		direction: string,
		phone: string,
		email: string,
		schedules: Schedule[],
		ownersEmails: string[],
		imageName: string | undefined,
		id: string | undefined = undefined
	) {
		this.id = id
		this.name = name
		this.description = description
		this.direction = direction
		this.phone = phone
		this.owners_emails = ownersEmails
		this.schedules = schedules
		this.about = about
		this.email = email
		this.image_name = imageName
	}

	getId(): string | undefined {
		return this.id
	}

	getName(): string {
		return this.name
	}

	getDescription(): string {
		return this.description
	}

	getDirection(): string {
		return this.direction
	}

	getPhone(): string {
		return this.phone
	}

	getOwnersEmails(): string[] {
		return this.owners_emails
	}

	getSchedules(): Schedule[] {
		return this.schedules
	}

	getAbout(): string {
		return this.about
	}

	getEmail(): string {
		return this.email
	}
	getImageName(): string | undefined {
		return this.image_name
	}

	setId(id: string): void {
		this.id = id
	}
}
