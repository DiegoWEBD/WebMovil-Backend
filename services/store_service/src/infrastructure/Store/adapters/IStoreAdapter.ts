import Schedule from '../../../domain/Schedule/Schedule'
import Store from '../../../domain/Store/Store'
import { IStore } from '../mongo_repository/StoreModel'

export default class IStoreAdapter extends Store {
	constructor(storeI: IStore) {
		super(
			storeI.name,
			storeI.description,
			storeI.about,
			storeI.direction,
			storeI.phone,
			storeI.email,
			storeI.schedules.map(
				schedule => new Schedule(schedule.day, schedule.open, schedule.close)
			),
			storeI.owners_emails,
			storeI.image_name,
			storeI._id.toString()
		)
	}
}
