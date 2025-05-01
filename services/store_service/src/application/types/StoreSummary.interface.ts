export default interface StoreSummary {
	id: string
	name: string
	description: string
	direction: string
	products_count: number | undefined
	feedback_rating: number | undefined
	image_name: string

	setProductsCount(productsCount: number): void
	setFeedbackRating(rating: number): void
}
