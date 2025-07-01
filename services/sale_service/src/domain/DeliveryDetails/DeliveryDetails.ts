export default class DeliveryDetails {
	private deliveryManEmail: string

	constructor(deliveryManEmail: string) {
		this.deliveryManEmail = deliveryManEmail
	}

	getDeliveryManEmail(): string {
		return this.deliveryManEmail
	}
}
