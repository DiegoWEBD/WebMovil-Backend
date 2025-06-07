import { Schema } from 'mongoose'

export interface ISaleDetail {
	product_code: string
	product_name: string
	quantity: number
	unit_price: number
}

const SaleDetailSchema = new Schema<ISaleDetail>({
	product_code: { type: String, required: true },
	product_name: { type: String, required: true },
	quantity: { type: Number, required: true },
	unit_price: { type: Number, required: true },
})

export default SaleDetailSchema
