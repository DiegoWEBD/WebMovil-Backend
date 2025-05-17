export default class SaleDetail {
	private productCode: string
	private productName: string
	private quantity: number
	private unitPrice: number

	constructor(
		productCode: string,
		productName: string,
		quantity: number,
		unitPrice: number
	) {
		this.productCode = productCode
		this.productName = productName
		this.quantity = quantity
		this.unitPrice = unitPrice
	}

	public getProductCode(): string {
		return this.productCode
	}

	public getProductName(): string {
		return this.productName
	}

	public getQuantity(): number {
		return this.quantity
	}

	public getUnitPrice(): number {
		return this.unitPrice
	}
}
