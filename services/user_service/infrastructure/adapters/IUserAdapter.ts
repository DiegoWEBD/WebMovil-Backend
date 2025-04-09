import User from '../../domain/User'
import { IUser } from '../mongo_repository/UserModel'

export default class IUserAdapter extends User {
	constructor(userI: IUser) {
		super(userI.email, userI.user_type)
	}
}
