import { model, Schema } from 'mongoose'

export interface IProduct {
	code: string
	name: string
	description: string
	price: number
	store_id: number
}

const ProductSchema = new Schema<IProduct>({
	code: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	store_id: { type: Number, required: true },
})

const ProductModel = model<IProduct>('Product', ProductSchema)

export default ProductModel
