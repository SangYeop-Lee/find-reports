import { Transform } from 'stream'
import mongoose from 'mongoose'
import DataSaver from './DataSaver.js'

class CorpCodeParser extends Transform {
	constructor() {
		super()
		this.isStarted = false
		this.remainder = ''
		this.Saver = new DataSaver("CorpCode")
	}
	
	_transform(chunk, encoding, callback) {
		
		const xml = this.remainder+chunk.toString()
		const corpLists = xml.split("<list>")
		if (!this.isStarted) {
			this.isStarted = true
			corpLists.shift()
		}
		this.remainder = corpLists.pop()
		const result = corpLists
			.map(parseCorpData)
			.filter(data => !(new RegExp(/^\s+$/)).test(data.stock_code))
		this.Saver.save(result)
		
		callback(null)
  }
	
	_flush(callback) {
		this.Saver.close()
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