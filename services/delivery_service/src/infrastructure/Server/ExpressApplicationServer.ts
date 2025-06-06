import express from 'express'
import http, { createServer } from 'http'

import ApplicationServer from '../../presentation/Server/ApplicationServer.interface'

export default class ExpressApplicationServer implements ApplicationServer {
	private server: http.Server

	constructor() {
		const app = express()
		this.server = createServer(app)
	}

	listen(port: number): void {
		this.server.listen(port, () =>
			console.log(`Server running on port ${port}`)
		)
	}

	getHttpServer(): http.Server {
		return this.server
	}
}
