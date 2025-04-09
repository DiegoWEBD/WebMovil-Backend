import { model, Schema } from 'mongoose'

export interface IOwner {
	email: string
	full_name: string
	profile_picture: string
}

const OwnerSchema = new Schema<IOwner>({
	email: { type: String, required: true },
	full_name: { type: String, required: true },
	profile_picture: { type: String, required: true },
})

const OwnerModel = model<IOwner>('Owner', OwnerSchema)

export default OwnerModel
