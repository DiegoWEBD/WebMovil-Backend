import Owner from '../../domain/Owner'
import { IOwner } from '../mongo_repository/OwnerModel'

export default class IOwnerAdapter extends Owner {
	constructor(ownerI: IOwner) {
		super(ownerI.email, ownerI.full_name, ownerI.profile_picture)
	}
}
