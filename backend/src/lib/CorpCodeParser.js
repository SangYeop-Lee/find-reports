
import { Transform } from 'stream'

class CorpCodeParser extends Transform {
	constructor() {
		super({ readableObjectMode: true, writableObjectMode: true })
		this.isStarted = false
		this.remainder = ''
	}
	
	_transform(chunk, encoding, callback) {
		const xml = this.remainder + chunk.toString()
		const corpLists = xml.split("<list>")
		if (!this.isStarted) {
			this.isStarted = true
			corpLists.shift()
		}
		this.remainder = corpLists.pop()
		callback(null, corpLists.map(parseCorpData))
		// TODO
		// save in db and drain data
  }
	
	_flush(callback) {
		callback(null)
	}
}

function parseCorpData(xml) {
	const tags = ['corp_code', 'corp_name', 'stock_code', 'modify_date']
	return tags.reduce((acc, tag) => ({
		...acc,
		[tag]: xml.match(new RegExp(`(?<=<${tag}>)[^]*(?=<\/${tag}>)`))[0]
	}), {})
}

export default CorpCodeParser