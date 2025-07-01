import { Document, model, Schema } from 'mongoose'
const { Mixed } = Schema.Types

import DispatchSchema, { IDispatch } from '../../Dispatch/DispatchSchema'
import SaleDetailSchema, { ISaleDetail } from './SaleDetailSchema'
import DeliveryDetailsSchema, {
	IDeliveryDetails,
} from '../../DeliveryDetails/DeliveryDetailsSchema'

export interface ISale extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }
	user_email: string
	user_name: string
	store_id: string
	store_name: string
	total: number
	date: Date
	feedback_id: string | undefined
	details: ISaleDetail[]
	dispatch_method_id: string
	dispatch_order_id: string | undefined
	dispatch: IDispatch | undefined
	delivery_details: IDeliveryDetails | undefined
	status:
		| 'Pendiente'
		| 'Buscando repartidor'
		| 'En camino'
		| 'Lista para retiro'
		| 'Completada'
}

const SaleSchema = new Schema<ISale>({
	user_email: { type: String, required: true },
	user_name: { type: String, required: true },
	store_id: { type: String, required: true },
	store_name: { type: String, required: true },
	total: { type: Number, required: true },
	date: { type: Date, required: true },
	feedback_id: { type: String, required: false },
	details: { type: [SaleDetailSchema], required: true },
	dispatch_method_id: {
		type: String,
		required: true,
	},
	dispatch_order_id: {
		type: String,
		required: false,
		default: null,
	},
	dispatch: {
		type: DispatchSchema,
		required: false,
		default: null,
	},
	delivery_details: {
		type: DeliveryDetailsSchema,
		required: false,
		default: null,
	},
	status: {
		type: String,
		required: true,
		default: 'Pendiente',
	},
})

const SaleModel = model<ISale>('Sale', SaleSchema)

export default SaleModel
