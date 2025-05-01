import StoreSummary from '../../../application/types/StoreSummary.interface'
import Store from '../../../domain/Store/Store'

export default class StoreSummaryAdapter implements StoreSummary {
	id: string
	name: string
	description: string
	direction: string
	products_count: number | undefined
	feedback_rating: number | undefined
	image_name: string

	constructor(store: Store) {
		this.id = store.getId() as string
		this.name = store.getName()
		this.description = store.getDescription()
		this.direction = store.getDirection()
		this.image_name = store.getImageName() as string
		this.products_count = undefined
		this.feedback_rating = undefined
	}

	setProductsCount(productsCount: number) {
		this.products_count = productsCount
	}

	setFeedbackRating(rating: number) {
		this.feedback_rating = rating
	}
}
