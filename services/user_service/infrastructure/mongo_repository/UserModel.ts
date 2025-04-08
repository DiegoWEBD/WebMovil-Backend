import { model, Schema } from 'mongoose'

export interface IUser {
	email: string
	full_name: string
	profile_picture: string
}

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true },
	full_name: { type: String, required: true },
	profile_picture: { type: String, required: true },
})

const UserModel = model<IUser>('User', UserSchema)

export default UserModel
