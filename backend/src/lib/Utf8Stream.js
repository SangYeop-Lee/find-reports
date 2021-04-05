import { Transform } from 'stream'

export default class Utf8Stream extends Transform {
	constructor() {
		super()
		this.remainder = Buffer.from('')
	}
	
	_transform(chunk, encoding, callback) {
		chunk = Buffer.concat([this.remainder, chunk])
		let lastByteHead = chunk.length-1
		for (let i=0; i<3; i++) {
			if (chunk[lastByteHead] < 128 || chunk[lastByteHead] >= 192)
				break
			lastByteHead--
		}
		
		[chunk, this.remainder] = [chunk.slice(0, lastByteHead), chunk.slice(lastByteHead-chunk.length)]
		
		callback(null, chunk)
	}
	_flush(callback) {
		callback(null, this.remainder)
	}
}