import { Schema } from 'mongoose'

export interface IDeliveryDetails {
	delivery_man_email: string
}

const DeliveryDetailsSchema = new Schema<IDeliveryDetails>({
	delivery_man_email: {
		type: String,
		required: true,
	},
})

export default DeliveryDetailsSchema
