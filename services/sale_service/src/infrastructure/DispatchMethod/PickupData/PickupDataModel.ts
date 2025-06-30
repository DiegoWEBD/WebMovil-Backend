import { Document, model, Schema } from 'mongoose'

export interface IPickupData extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }
	type: 'pickup'
	store_direction: string
}

const PickupDataSchema = new Schema<IPickupData>({
	type: {
		type: String,
		required: true,
		default: 'pickup',
	},
	store_direction: {
		type: String,
		required: true,
	},
})

const PickupDataModel = model<IPickupData>('PickupData', PickupDataSchema)

export default PickupDataModel
