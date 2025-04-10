import { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
	email: string
	full_name: string
	phone: string
	profile_picture: string
	user_type: string
}

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true },
	full_name: { type: String, required: true },
	phone: { type: String, required: true },
	profile_picture: { type: String, required: true },
	user_type: { type: String, required: true },
})

const UserModel = model<IUser>('User', UserSchema)

export default UserModel
