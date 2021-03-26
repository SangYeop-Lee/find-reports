import unzip from 'unzip-stream'
import request from './request.js'
import CorpCodeParser from './CorpCodeParser.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const destination = dirname(fileURLToPath(import.meta.url))+"/../data"

request('/api/corpCode.xml', (err, res) => {
	res
		.pipe(unzip.Parse())
		.on('entry', function (entry) {
			entry
				.pipe(new CorpCodeParser())
		})
})