import ExpressSocketServer from './infrastructure/Server/adapters/ExpressSocketServer'
import ExpressApplicationServer from './infrastructure/Server/ExpressApplicationServer'
import ShippingSocket from './infrastructure/Shipping/ShippingSocket'
import CustomSocket from './presentation/WebSocket/Socket/CustomSocket.interface'

const appServer = new ExpressApplicationServer()
const socketServer: ExpressSocketServer = new ExpressSocketServer(
	appServer.getHttpServer()
)

const sockets: CustomSocket[] = [new ShippingSocket(socketServer)]

sockets.forEach(socket => socket.connect())
appServer.listen(3002)
