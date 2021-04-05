// import compression from 'compression'
import express from 'express'
import credentials from './credentials.js'

const app = express()
const port = 3000
const url = "https://find-reports-zyson.run.goorm.io"

// app.use(compression())
app.use(express.static(credentials.SRC_PATH+'/data'))

app.get('/', (req, res) => {
	res.send('Hello world sangyeop-lee!')
})
// https://expressjs.com/ko/guide/using-middleware.html#middleware.router

app.listen(port, () => {
	console.log(`Example App running at ${url}`)
})