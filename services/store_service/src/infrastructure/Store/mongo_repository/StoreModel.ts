import { Document, model, Schema } from 'mongoose'
import ScheduleSchema, { ISchedule } from './ScheduleSchema'

export interface IStore extends Document {
	_id: { type: Schema.Types.ObjectId; auto: true }
	name: string
	description: string
	about: string
	direction: string
	phone: string
	email: string
	schedules: ISchedule[]
	owners_emails: string[]
	image_name: string | undefined
}

const StoreSchema = new Schema<IStore>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	direction: { type: String, required: true },
	about: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	schedules: { type: [ScheduleSchema], required: true },
	owners_emails: { type: [String], required: true },
	image_name: { type: String, required: false },
})

const StoreModel = model<IStore>('Store', StoreSchema)

export default StoreModel
