import User from '../../domain/User'
import UserModel from '../mongo_repository/UserModel'

export default class UserModelAdapter extends UserModel {
	constructor(user: User) {
		super({
			email: user.getEmail(),
			full_name: user.getFullName(),
			profile_picture: user.getProfilePicture(),
		})
	}
}
