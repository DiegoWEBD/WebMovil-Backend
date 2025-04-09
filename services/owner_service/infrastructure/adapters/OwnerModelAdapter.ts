import Owner from '../../domain/Owner'
import OwnerModel from '../mongo_repository/OwnerModel'

export default class OwnerModelAdapter extends OwnerModel {
	constructor(owner: Owner) {
		super({
			email: owner.getEmail(),
			full_name: owner.getFullName(),
			profile_picture: owner.getProfilePicture(),
		})
	}
}
