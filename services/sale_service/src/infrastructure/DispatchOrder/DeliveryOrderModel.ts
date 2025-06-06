import { Document, model, Schema } from 'mongoose'

export interface IDeliveryOrder extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }
	sale_code: string
	issue_date: Date
	price: number
	street: string
	number: string
	customer_instructions: string | undefined
}

const DeliveryOrderSchema = new Schema<IDeliveryOrder>({
	sale_code: {
		type: String,
		required: true,
	},
	issue_date: {
		type: Date,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	street: {
		type: String,
		required: true,
	},
	number: {
		type: String,
		required: true,
	},
	customer_instructions: {
		type: String,
	},
})

const DeliveryOrderModel = model<IDeliveryOrder>(
	'DeliveryOrder',
	DeliveryOrderSchema
)
export default DeliveryOrderModel
