import { Schema } from 'mongoose'

export interface ISchedule {
	day:
		| 'Lunes'
		| 'Martes'
		| 'Miércoles'
		| 'Jueves'
		| 'Viernes'
		| 'Sábado'
		| 'Domingo'
	open: string
	close: string
}

const ScheduleSchema = new Schema<ISchedule>({
	day: {
		type: String,
		enum: [
			'Lunes',
			'Martes',
			'Miércoles',
			'Jueves',
			'Viernes',
			'Sábado',
			'Domingo',
		],
		required: true,
	},
	open: { type: String, required: true },
	close: { type: String, required: true },
})

export default ScheduleSchema
