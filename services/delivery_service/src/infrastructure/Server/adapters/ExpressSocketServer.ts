import { Server, Socket } from 'socket.io'
import http from 'http'
import SocketConnection from '../../../presentation/WebSocket/SocketServer/SocketConnection.interface'
import SocketServer from '../../../presentation/WebSocket/SocketServer/SocketServer.interface'
import ExpressSocketConnection from './ExpressSocketConnection'

export default class ExpressSocketServer implements SocketServer {
	private io: Server

	constructor(httpServer: http.Server) {
		this.io = new Server(httpServer, {
			cors: {
				origin: '*',
			},
		})
	}

	onConnection(handler: (socket: SocketConnection) => void): void {
		this.io.on('connection', (socket: Socket) => {
			// Wrap the Socket.IO socket into our abstract socket connection.
			const connection: SocketConnection = new ExpressSocketConnection(
				socket,
				this.io
			)
			handler(connection)
		})
	}

	broadcast(event: string, data: any): void {
		this.io.emit(event, data)
	}
}
