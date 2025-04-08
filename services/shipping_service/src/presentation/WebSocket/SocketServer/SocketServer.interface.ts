import SocketConnection from './SocketConnection.interface'

export default interface SocketServer {
	onConnection(handler: (socket: SocketConnection) => void): void
	broadcast(event: string, data: any): void
}
