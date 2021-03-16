import express from 'express'

const app = express()
const port = 3000
const url = "https://find-reports-zyson.run.goorm.io"

app.get('/', (req, res) => {
	res.send('Hello world sangyeop-lee!')
})

app.listen(port, () => {
	console.log(`Example App running at ${url}`)
})