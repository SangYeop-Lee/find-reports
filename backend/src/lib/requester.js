import https from 'https'
import credentials from '../credentials.js'
import qs from 'qs'

// usage requester(path[, querystring], callback)
// callback(err, http.ClientRequest)
export default function requester (path, querystring, cb) {
	
	if (typeof querystring==='function') {
		cb = querystring
		querystring = {}
	}
	
	const optionPath = path+qs.stringify({
		crtfc_key: credentials.API_KEY,
		...querystring
	}, { addQueryPrefix: true })
	
	const options = {
		hostname: 'opendart.fss.or.kr',
		path: optionPath,
		headers: { 'User-Agent': 'Mozilla/5.0' }
	}
	
	https.get(options, res => {
		const { statusCode } = res
		
		if (statusCode !== 200) {
			cb(new Error('Request Failed.\n' +
									 `Status Code: ${statusCode}`))
			res.resume()
			return
		}
		
		cb(null, res)
	})
}