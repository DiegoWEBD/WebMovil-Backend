import Store from '../../../domain/Store/Store'
import StoreModel from '../mongo_repository/StoreModel'

export default class StoreModelAdapter extends StoreModel {
	constructor(store: Store) {
		super({
			name: store.getName(),
			description: store.getDescription(),
			direction: store.getDirection(),
			phone: store.getPhone(),
			owners_emails: store.getOwnersEmails(),
		})
	}
}
