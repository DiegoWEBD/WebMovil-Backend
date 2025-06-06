export default class Dispatch {
	private code: string
	private date: Date

	constructor(code: string, date: Date) {
		this.code = code
		this.date = date
	}

	getCode(): string {
		return this.code
	}

	getDate(): Date {
		return this.date
	}
}
