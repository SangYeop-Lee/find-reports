import requester from './lib/requester.js'

requester('/api/list.json', (err, res) => {
	res.setEncoding('utf8')
	res.on('data', console.log)
	res.on('end')
})