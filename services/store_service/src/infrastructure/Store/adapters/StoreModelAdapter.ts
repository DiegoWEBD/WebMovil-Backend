import Store from '../../../domain/Store/Store'
import StoreModel from '../mongo_repository/StoreModel'

export default class StoreModelAdapter extends StoreModel {
	constructor(store: Store) {
		super({
			name: store.getName(),
			description: store.getDescription(),
			direction: store.getDirection(),
			about: store.getAbout(),
			phone: store.getPhone(),
			email: store.getEmail(),
			schedules: store.getSchedules().map(schedule => ({
				day: schedule.getDay(),
				open: schedule.getOpen(),
				close: schedule.getClose(),
			})),
			owners_emails: store.getOwnersEmails(),
			image_name: store.getImageName(),
		})
	}
}
