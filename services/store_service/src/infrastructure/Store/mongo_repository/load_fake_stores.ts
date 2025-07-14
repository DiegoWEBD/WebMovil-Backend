import StoreModel from './StoreModel'
import { ISchedule } from './ScheduleSchema'

const generateRandomSchedule = (): ISchedule[] => {
	return [
		{
			day: 'Lunes',
			open: '09:00',
			close: '18:00',
		},
		{
			day: 'Martes',
			open: '09:00',
			close: '18:00',
		},
		{
			day: 'Miércoles',
			open: '09:00',
			close: '18:00',
		},
		{
			day: 'Jueves',
			open: '09:00',
			close: '18:00',
		},
		{
			day: 'Viernes',
			open: '09:00',
			close: '18:00',
		},
	]
}

const storeNames = [
	'Almacén Doña Clara',
	'Panadería El Trigal',
	'Verdulería San Pedro',
	'Botillería La Esquina',
	'Librería Central',
	'Café Aromas del Sur',
	'Ferretería Los Andes',
	'Bazar El Encuentro',
	'Carnicería El Gaucho',
	'Supermercado La Familia',
	'Floristería El Jardín',
	'Peluquería Estilo Chic',
]

export const loadFakeStores = async () => {
	try {
		await StoreModel.deleteMany({}) // Clean before insert

		const fakeStores = storeNames.map(name => ({
			name,
			description: `Descripción de ${name.toLowerCase()}`,
			about: `Acerca de ${name.toLowerCase()}, un negocio tradicional en Chile.`,
			direction: `Calle Falsa ${Math.floor(Math.random() * 1000)}, Santiago`,
			phone: `+56 9 ${Math.floor(10000000 + Math.random() * 89999999)}`,
			email: `${name.toLowerCase().replace(/\s+/g, '')}@correo.cl`,
			schedules: generateRandomSchedule(),
			owners_emails: ['sebastian.robles02@alumnos.ucn.cl'],
			image_name: undefined,
		}))

		await StoreModel.insertMany(fakeStores)
		console.log(`${storeNames.length} tiendas falsas insertadas correctamente.`)
	} catch (err) {
		console.error('Error al insertar tiendas falsas:', err)
	}
}
