import { Document, model, Schema } from 'mongoose'
const { Mixed } = Schema.Types

import { IDispatch } from '../../Dispatch/DispatchSchema'
import SaleDetailSchema, { ISaleDetail } from './SaleDetailSchema'

export interface ISale extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }
	user_email: string
	user_name: string
	store_id: string
	total: number
	date: Date
	feedback_id: string | undefined
	details: ISaleDetail[]
	dispatch_method: 'delivery' | 'pickup'
	dispatch_order_code: string | undefined
	dispatch: IDispatch | undefined
}

const SaleSchema = new Schema<ISale>({
	user_email: { type: String, required: true },
	user_name: { type: String, required: true },
	store_id: { type: String, required: true },
	total: { type: Number, required: true },
	date: { type: Date, required: true },
	feedback_id: { type: String, required: false },
	details: { type: [SaleDetailSchema], required: true },
	dispatch_method: {
		type: String,
		enum: ['delivery', 'pickup'],
		required: true,
	},

	dispatch_order_code: {
		type: String,
		required: false,
		default: null,
	},
	dispatch: {
		type: Mixed,
		required: false,
		default: null,
	},
})

const SaleModel = model<ISale>('Sale', SaleSchema)

export default SaleModel
