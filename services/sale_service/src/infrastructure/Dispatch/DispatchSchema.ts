import { Schema } from 'mongoose'

export interface IDispatch {
	code: string
	date: Date
}

const DispatchSchema = new Schema<IDispatch>({
	code: {
		type: String,
		required: true,
		unique: true,
	},
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
})

export default DispatchSchema
