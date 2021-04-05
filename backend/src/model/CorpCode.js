import mongoose from 'mongoose'

const schema = new mongoose.Schema({
	corp_code: 'string',
	corp_name: 'string',
	stock_code: 'string',
	modify_date: 'string',
	// TODO
	// 	add report codes
	//	[..., {year, quarter, code, saved}]
})

const CorpCode = mongoose.model('CorpCode', schema)

export default CorpCode