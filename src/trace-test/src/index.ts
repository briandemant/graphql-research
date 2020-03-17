import { countAllRequests } from './monitoring'
import * as express from 'express'
const app = express()
app.use(countAllRequests())

app.get('/', (req, res) => {
	res.send('Hello?')
})

app.listen(2300)
