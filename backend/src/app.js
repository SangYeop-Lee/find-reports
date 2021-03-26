// import compression from 'compression'
import express from 'express'
import credentials from './credentials.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000
const url = "https://find-reports-zyson.run.goorm.io"

// app.use(compression())
app.use(express.static(__dirname+'/data'))

app.get('/', (req, res) => {
	res.send('Hello world sangyeop-lee!')
})
// https://expressjs.com/ko/guide/using-middleware.html#middleware.router

app.listen(port, () => {
	console.log(`Example App running at ${url}`)
})