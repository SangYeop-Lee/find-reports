import unzip from 'unzip-stream'
import request from './request.js'
import CorpCodeParser from './CorpCodeParser.js'
import credentials from '../credentials.js'

const destination = credentials.SRC_PATH+"/data"

request('/api/corpCode.xml', (err, res) => {
	res
		.pipe(unzip.Parse())
		.on('entry', function (entry) {
			entry
				.pipe(new CorpCodeParser())
		})
})