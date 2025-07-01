import { Document, model, Schema } from 'mongoose'

export interface IDeliveryOrder extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }

	street: string
	number: string
	customer_instructions: string | undefined
}

const DeliveryOrderSchema = new Schema<IDeliveryOrder>({
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
