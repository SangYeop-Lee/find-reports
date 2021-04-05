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
			throw new Error("wrong model name")
		
		switch (modelName) {
			case 'CorpCode':
				this.save = saveCorpCode.bind(this)
				break
		}
		
		mongoose.connect('mongodb://localhost:27017/', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	}
	
	close() {
		if (this.numTasks===0)
			mongoose.disconnect()
		this.shouldClose = true
	}
}

function saveCorpCode(data) {
	this.numTasks ++
	const that = this

	this.Model.bulkWrite(data.map(datum => ({
		updateOne: {
			filter: { corp_code: datum.corp_code },
			update: datum,
			upsert: true
		}
	}))).then( res => {
		if (--that.numTasks===0 && that.shouldClose)
			mongoose.disconnect()
	}).catch( err => {
		console.log(err)
	})
}

export default DataSaver