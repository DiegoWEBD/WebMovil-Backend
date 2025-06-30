import { Schema } from 'mongoose'

export interface IDispatch {
	date: Date
}

const DispatchSchema = new Schema<IDispatch>({
	date: {
		type: Date,
		required: true,
		default: Date.now,
	},
})

export default DispatchSchema
