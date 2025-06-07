import serviceClient from '../../axios/service_client'
import ProductModel from './ProductModel'

/*const storeIds = [
	'68351662b7c1ed4d64a74a1f',
	'68351662b7c1ed4d64a74a25',
	'68351662b7c1ed4d64a74a2b',
	'68351662b7c1ed4d64a74a31',
	'68351662b7c1ed4d64a74a37',
	'68351662b7c1ed4d64a74a3d',
	'68351662b7c1ed4d64a74a43',
	'68351662b7c1ed4d64a74a49',
	'68351662b7c1ed4d64a74a4f',
	'68351662b7c1ed4d64a74a55',
	'68351662b7c1ed4d64a74a5b',
	'68351662b7c1ed4d64a74a61',
]*/

const productTemplates = [
	{ name: 'Pan integral', description: 'Pan saludable y fresco', price: 1200 },
	{
		name: 'Leche entera',
		description: 'Leche de vaca pasteurizada',
		price: 950,
	},
	{
		name: 'Manzanas rojas',
		description: 'Fruta fresca de temporada',
		price: 1800,
	},
	{
		name: 'Coca-Cola 1.5L',
		description: 'Bebida gaseosa tradicional',
		price: 1400,
	},
	{
		name: 'Chocolate artesanal',
		description: 'Hecho en el sur de Chile',
		price: 2200,
	},
	{ name: 'Pasta de dientes', description: 'Protección completa', price: 1500 },
	{
		name: 'Detergente líquido',
		description: 'Rinde hasta 20 lavados',
		price: 3500,
	},
	{ name: 'Café molido', description: 'Café tostado de grano', price: 2800 },
	{ name: 'Arroz grano largo', description: 'Empaque de 1kg', price: 1100 },
	{ name: 'Aceite vegetal', description: 'Botella de 1 litro', price: 2000 },
	{ name: 'Azúcar rubia', description: 'Empaque de 1kg', price: 1150 },
	{ name: 'Huevos de campo', description: 'Docena de huevos', price: 2600 },
	{ name: 'Queso mantecoso', description: '500 gramos', price: 3500 },
	{ name: 'Atún en conserva', description: 'Tarro de 170 gramos', price: 1300 },
	{ name: 'Papel higiénico', description: 'Pack de 4 unidades', price: 1900 },
	{ name: 'Jabón líquido', description: 'Con aroma a lavanda', price: 1700 },
	{ name: 'Shampoo', description: 'Para todo tipo de cabello', price: 2100 },
	{ name: 'Papas fritas', description: 'Bolsa de 200g', price: 1500 },
	{
		name: 'Mermelada de frutilla',
		description: 'Hecha con fruta natural',
		price: 2500,
	},
	{ name: 'Harina sin polvos', description: '1kg', price: 1000 },
	{ name: 'Té negro', description: 'Caja con 20 bolsitas', price: 900 },
	{ name: 'Yogurt natural', description: '500ml', price: 1300 },
	{ name: 'Zanahorias', description: 'Frescas, por kilo', price: 1000 },
	{ name: 'Cebolla morada', description: 'Por kilo', price: 950 },
	{ name: 'Mayonesa', description: 'Envase 400g', price: 1600 },
	{ name: 'Galletas surtidas', description: 'Paquete 250g', price: 1200 },
	{ name: 'Helado de vainilla', description: 'Litro', price: 2800 },
	{ name: 'Jugo natural', description: 'Botella 1 litro', price: 1500 },
	{ name: 'Servilletas', description: 'Paquete de 100', price: 1000 },
	{ name: 'Desodorante', description: 'Spray 150ml', price: 2700 },
	{ name: 'Agua mineral', description: 'Botella 1.5L sin gas', price: 1000 },
	{ name: 'Lentejas', description: 'Bolsa 1kg', price: 1400 },
	{ name: 'Pollo entero', description: 'Aprox. 1.5kg', price: 4900 },
	{ name: 'Jabón en barra', description: 'Pack de 3 unidades', price: 1500 },
	{ name: 'Limpiavidrios', description: 'Spray 500ml', price: 1800 },
	{ name: 'Cepillo de dientes', description: 'Suave', price: 900 },
	{ name: 'Fideos spaghetti', description: '500g', price: 1100 },
	{ name: 'Toalla Nova', description: 'Rollo de cocina', price: 1300 },
	{ name: 'Cereal matinal', description: 'Caja 500g', price: 3200 },
	{ name: 'Salsa de tomate', description: 'Botella 350g', price: 1000 },
	{ name: 'Desinfectante', description: 'Botella 1 litro', price: 3000 },
	{ name: 'Palta hass', description: 'Por unidad', price: 1700 },
	{ name: 'Papel aluminio', description: '10 metros', price: 1900 },
	{ name: 'Cuchara de cocina', description: 'De madera', price: 800 },
	{ name: 'Tenedor plástico', description: 'Pack 50 unidades', price: 1200 },
	{ name: 'Bolsa de basura', description: '10 unidades', price: 1500 },
	{ name: 'Pimiento rojo', description: 'Unidad', price: 800 },
	{ name: 'Cloro', description: '1 litro', price: 1100 },
	{ name: 'Esponja para lavar', description: 'Pack de 2', price: 700 },
	{ name: 'Detergente en polvo', description: '1kg', price: 2700 },
]

const getRandomInt = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min

const generateRandomCode = (): string =>
	Math.random().toString(36).substring(2, 10).toUpperCase()

export const loadFakeProducts = async () => {
	try {
		const response = await serviceClient.get(`${process.env.STORE_SERVICE_URL}`)

		const stores = response.data.stores
		await ProductModel.deleteMany({}) // Clean before inserting

		const productsToInsert = []

		for (const store of stores) {
			const numProducts = getRandomInt(18, 28)

			for (let i = 0; i < numProducts; i++) {
				const template =
					productTemplates[getRandomInt(0, productTemplates.length - 1)]

				const product = {
					code: generateRandomCode(),
					name: template.name,
					description: template.description,
					price: template.price,
					store_id: store.id,
					store_name: store.name,
					picture: '',
					stock: getRandomInt(5, 50).toString(),
				}

				productsToInsert.push(product)
			}
		}

		await ProductModel.insertMany(productsToInsert)
		console.log(
			`${productsToInsert.length} productos falsos insertados correctamente.`
		)
	} catch (err) {
		console.error('Error al insertar productos falsos:', err)
	}
}
