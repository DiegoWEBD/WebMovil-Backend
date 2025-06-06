export default interface SocketConnection {
	on(event: string, handler: (data: any) => void): void
	emit(event: string, data: any): void
	emitToRoom(room: string, event: string, data: any): void
	getData(key: string): any
	setData(key: string, value: any): void
	join(room: string): void
}
