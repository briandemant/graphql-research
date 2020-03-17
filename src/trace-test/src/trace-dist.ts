import express, { Request, Response } from 'express'
import cluster from 'cluster'
import { cpus } from 'os'

if (cluster.isMaster) {
	const cpuCount = cpus().length

	// Create a worker for each CPU
	for (let i = 0; i < cpuCount; i += 1) {
		cluster.fork()
	}
} else {
	const app = express()

	app.get('/', function(req, res) {
		res.send('Hello World!')
	})

	// Bind to a port
	app.listen(3000)
	console.log('Application running!')
}
