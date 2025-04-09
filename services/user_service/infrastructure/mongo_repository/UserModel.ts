import { model, Schema } from 'mongoose'

export interface IUser {
	email: string
	user_type: string
}

const UserSchema = new Schema<IUser>({
	email: { type: String, required: true },
	user_type: { type: String, required: true },
})

const UserModel = model<IUser>('User', UserSchema)

export default UserModel
