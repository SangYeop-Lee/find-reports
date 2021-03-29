import mongoose from 'mongoose'
import credentials from '../credentials.js'
import Model from '../model/index.js'

// modelNames: CorpCode, 
class DataSaver {
	constructor(modelName) {
		this.numTasks = 0
		this.shouldClose = false
		this.Model = Model[modelName]
		if (!this.Model)
			new Error("wrong model name")
		
		this.numUpdates = 0
		
		mongoose.connect('mongodb://localhost:27017/', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	}
	
	save(data) {
		this.numTasks += data.length
		const that = this
		// find faster way to insert. (upsert or find && create)
		data.forEach(datum => {
			this.Model.updateOne({ "corp_code": datum.corp_code }, datum, { upsert: true }, (err, res) => {
				if (err) console.log(err)
				if (--that.numTasks===0 && that.shouldClose) {
					mongoose.disconnect()
				}
				that.numUpdates += res.n + res.nModified
			})
		})
	}
	
	close() {
		if (this.numTasks===0)
			mongoose.disconnect()
		this.shouldClose = true
	}
}

export default DataSaver