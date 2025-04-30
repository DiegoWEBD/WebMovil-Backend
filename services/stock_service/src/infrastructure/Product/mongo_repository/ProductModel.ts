import { model, Schema } from 'mongoose'

export interface IProduct {
	code: string
	name: string
	description: string
	price: number
	store_id: string
	picture: string
	stock: string
}

const ProductSchema = new Schema<IProduct>({
	code: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	store_id: { type: String, required: true },
	picture: { type: String, required: false, default: '' },
	stock: { type: String, required: true },
})

const ProductModel = model<IProduct>('Product', ProductSchema)

export default ProductModel
