import { Document, model, Schema } from 'mongoose'

export interface IPickupOrder extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }
	issue_date: Date
	available_from: Date
	available_until: Date
}

const PickupOrderSchema = new Schema<IPickupOrder>({
	issue_date: {
		type: Date,
		required: true,
	},
	available_from: {
		type: Date,
		required: true,
	},
	available_until: {
		type: Date,
		required: true,
	},
})

const PickupOrderModel = model<IPickupOrder>('PickupOrder', PickupOrderSchema)
export default PickupOrderModel
