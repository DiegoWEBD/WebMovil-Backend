export default class Dispatch {
	private date: Date

	constructor(date: Date) {
		this.date = date
	}

	getDate(): Date {
		return this.date
	}
}
