type Day =
	| 'Lunes'
	| 'Martes'
	| 'Miércoles'
	| 'Jueves'
	| 'Viernes'
	| 'Sábado'
	| 'Domingo'

export default class Schedule {
	private day: Day
	private open: string
	private close: string

	constructor(day: Day, open: string, close: string) {
		this.day = day
		this.open = open
		this.close = close
	}

	public getDay(): Day {
		return this.day
	}

	public getOpen(): string {
		return this.open
	}

	public getClose(): string {
		return this.close
	}
}
