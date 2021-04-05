import mongoose from 'mongoose'

import CorpCode from './CorpCode.js'

const Models = {
	CorpCode
}

function initialize(modelName) {
	const model = Models[modelName]
	if (!model) return console.log("wrong model name: "+modelName)
	
	mongoose.connect('mongodb://localhost:27017/', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	
	model.deleteMany({}, () => {
		console.log("intialized "+modelName)
		mongoose.disconnect()
	})
}

export default Models