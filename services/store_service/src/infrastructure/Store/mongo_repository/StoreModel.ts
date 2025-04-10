import { Document, model, Schema } from 'mongoose'

export interface IStore extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }
	name: string
	description: string
	direction: string
	phone: string
	owners_emails: string[]
}

const StoreSchema = new Schema<IStore>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	direction: { type: String, required: true },
	phone: { type: String, required: true },
	owners_emails: { type: [String], required: true },
})

const StoreModel = model<IStore>('Store', StoreSchema)

export default StoreModel
