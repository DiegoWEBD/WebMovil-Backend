import User from '../../domain/User'
import UserModel from '../mongo_repository/UserModel'

export default class UserModelAdapter extends UserModel {
	constructor(user: User) {
		super({
			email: user.getEmail(),
			full_name: user.getFullName(),
			phone: user.getPhone(),
			profile_picture: user.getProfilePicture(),
			user_type: user.getUserType(),
		})
	}
}
