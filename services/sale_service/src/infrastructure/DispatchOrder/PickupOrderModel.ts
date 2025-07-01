import { Document, model, Schema } from 'mongoose'

export interface IPickupOrder extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }
	store_direction: string
}

const PickupOrderSchema = new Schema<IPickupOrder>({
	store_direction: {
		type: String,
		required: true,
	},
})

const PickupOrderModel = model<IPickupOrder>('PickupOrder', PickupOrderSchema)
export default PickupOrderModel
