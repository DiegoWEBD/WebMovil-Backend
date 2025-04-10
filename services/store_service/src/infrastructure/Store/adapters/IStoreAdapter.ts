import Store from '../../../domain/Store/Store'
import { IStore } from '../mongo_repository/StoreModel'

export default class IStoreAdapter extends Store {
	constructor(storeI: IStore) {
		super(
			storeI.name,
			storeI.description,
			storeI.direction,
			storeI.phone,
			storeI.owners_emails
		)
		this.setId(storeI._id.toString())
	}
}
