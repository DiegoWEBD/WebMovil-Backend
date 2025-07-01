import { Document, model, Schema } from 'mongoose'

export interface IDeliveryman extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }
	email: string
	name: string
	phone: string
	vehicleType: string
	vehiclePlate: string
	isAvailable: boolean
}

const DeliverymanSchema = new Schema<IDeliveryman>({
	email: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	phone: { type: String, required: true },
	vehicleType: { type: String, required: true },
	vehiclePlate: { type: String, required: true },
	isAvailable: { type: Boolean, required: true, default: true },
})

const DeliverymanModel = model<IDeliveryman>('Deliveryman', DeliverymanSchema)

export default DeliverymanModel
