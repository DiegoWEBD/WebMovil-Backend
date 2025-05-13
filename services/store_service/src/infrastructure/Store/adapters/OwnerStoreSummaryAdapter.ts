import OwnerStoreSummary from '../../../application/types/OwnerStoreSummary'
import { IStore } from '../mongo_repository/StoreModel'

export default class OwnerStoreSummaryAdapter implements OwnerStoreSummary {
	id: string
	name: string

	constructor(store: IStore) {
		this.id = store.id as string
		this.name = store.name
	}
}
