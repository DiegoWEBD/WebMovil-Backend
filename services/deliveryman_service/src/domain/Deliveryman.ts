export default class Deliveryman {
	private id: string | undefined
	private email: string
	private name: string
	private phone: string
	private vehicleType: string
	private vehiclePlate: string
	private isAvailable: boolean

	constructor(
		id: string | undefined,
		email: string,
		name: string,
		phone: string,
		vehicleType: string,
		vehiclePlate: string,
		isAvailable: boolean = true
	) {
		this.id = id
		this.email = email
		this.name = name
		this.phone = phone
		this.vehicleType = vehicleType
		this.vehiclePlate = vehiclePlate
		this.isAvailable = isAvailable
	}

	getId(): string | undefined {
		return this.id
	}

	setId(id: string): void {
		this.id = id
	}

	getEmail(): string {
		return this.email
	}

	getName(): string {
		return this.name
	}

	getPhone(): string {
		return this.phone
	}

	getVehicleType(): string {
		return this.vehicleType
	}

	getVehiclePlate(): string {
		return this.vehiclePlate
	}

	getIsAvailable(): boolean {
		return this.isAvailable
	}

	setIsAvailable(isAvailable: boolean): void {
		this.isAvailable = isAvailable
	}
}
