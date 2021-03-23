import unzip from 'unzip-stream'
import path from 'path'
import request from './request.js'

const __dirname = path.resolve();

// requester('/api/list.json', (err, res) => {
// 	res.setEncoding('utf8')
// 	res.on('data', console.log)
// 	res.on('end')
// })
console.log(__dirname)
requester('/api/corpCode.xml', (err, res) => {
	res
		.pipe(unzip.Extract({ path: __dirname+'/data' }))
})