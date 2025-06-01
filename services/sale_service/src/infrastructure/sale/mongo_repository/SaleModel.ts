import { Document, model, Schema } from 'mongoose'
import SaleDetailSchema, { ISaleDetail } from './SaleDetailSchema'

export interface ISale extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }
	user_email: string
	user_name: string
	store_id: string
	total: number
	date: Date
	details: ISaleDetail[]
	feedback_id: string | undefined
}

const SaleSchema = new Schema<ISale>({
	user_email: { type: String, required: true },
	user_name: { type: String, required: true },
	store_id: { type: String, required: true },
	total: { type: Number, required: true },
	date: { type: Date, required: true },
	details: { type: [SaleDetailSchema], required: true },
	feedback_id: { type: String, required: false },
})

const SaleModel = model<ISale>('Sale', SaleSchema)

export default SaleModel
