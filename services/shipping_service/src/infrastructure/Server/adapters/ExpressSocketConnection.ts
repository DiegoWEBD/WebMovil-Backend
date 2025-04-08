import { Server, Socket } from 'socket.io'
import SocketConnection from '../../../presentation/WebSocket/SocketServer/SocketConnection.interface'

export default class ExpressSocketConnection implements SocketConnection {
	private socket: Socket
	private io: Server

	constructor(socket: Socket, io: Server) {
		this.socket = socket
		this.io = io
	}

	on(event: string, handler: (data: any) => void): void {
		this.socket.on(event, handler)
	}

	emit(event: string, data: any): void {
		this.socket.emit(event, data)
	}

	emitToRoom(room: string, event: string, data: any): void {
		this.io.to(room).emit(event, data)
	}

	getData(key: string) {
		return this.socket.data[key]
	}

	setData(key: string, value: any): void {
		this.socket.data[key] = value
	}

	join(room: string): void {
		this.socket.join(room)
	}
}
