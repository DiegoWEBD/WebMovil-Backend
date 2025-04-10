import { model, Schema } from 'mongoose'

export interface IOwner {
	email: string
}

const OwnerSchema = new Schema<IOwner>({
	email: { type: String, required: true },
})

const OwnerModel = model<IOwner>('Owner', OwnerSchema)

export default OwnerModel
