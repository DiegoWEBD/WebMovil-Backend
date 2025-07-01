import CustomSocket from '../../presentation/WebSocket/Socket/CustomSocket.interface'
import SocketConnection from '../../presentation/WebSocket/SocketServer/SocketConnection.interface'
import SocketServer from '../../presentation/WebSocket/SocketServer/SocketServer.interface'

export default class ShippingSocket implements CustomSocket {
	private socketServer: SocketServer

	constructor(socketServer: SocketServer) {
		this.socketServer = socketServer
	}

	connect(): void {
		this.socketServer.onConnection((socket: SocketConnection) => {
			console.log('Usuario conectado a DeliverySocket')

			socket.on('register', data => {
				socket.setData('user_type', data.user_type)
				socket.setData('email', data.email)
				socket.join(data.user_type)

				console.log(`Usuario ${data.email} registrado como ${data.user_type}`)
			})

			socket.on('request-shipping', data => {
				const userType = socket.getData('user_type')
				const email = socket.getData('email')

				console.log(`Petición de despacho recibida por ${email} (${userType})`)
				console.log(data)

				socket.emitToRoom('delivery-man', 'shipping-requested', data)
			})

			socket.on('accept-shipping', data => {})
		})
	}
}
