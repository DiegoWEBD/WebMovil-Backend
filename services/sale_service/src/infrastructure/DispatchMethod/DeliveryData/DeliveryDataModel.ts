import { Document, model, Schema } from 'mongoose'

export interface IDeliveryData extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }
	type: 'delivery'
	street: string
	number: string
	customer_instructions: string | undefined
}

const DeliveryDataSchema = new Schema<IDeliveryData>({
	type: {
		type: String,
		required: true,
		default: 'delivery',
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
		required: false,
		default: null,
	},
})

const DeliveryDataModel = model<IDeliveryData>(
	'DeliveryData',
	DeliveryDataSchema
)

export default DeliveryDataModel
