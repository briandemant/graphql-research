import { Buffer } from 'buffer'

require('dotenv-flow').config({
	path: __dirname + '/../../../',
})

//console.log(Object.keys(process.env).filter((key) => key.startsWith('DEV')).map((key) => [key, process.env[key]]))

let missing = ['DEV_PUBLIC_KEY', 'LEGACY_BASIC_AUTH_CREDENTIALS'].filter(key => typeof process.env[key] !== 'string')

if (missing.length > 0) {
	throw new Error(`
.env file is missing the following keys	
	
${missing.join('\n')}

see .env.example for examples / docs
	`)
}
export const Config = {
	api: {
		legacy: {
			publicKey: process.env.DEV_PUBLIC_KEY!,
			baseUrl: process.env.DOMAIN_WWW!.replace('www', 'api'),
			baseIntegrationUrl: process.env.DOMAIN_WWW!.replace('www', 'api') + '/modules/gg_integration/',
			baseAppApiUrl: process.env.DOMAIN_WWW!.replace('www', 'api') + '/modules/gg_app/',
			basicAuthCredentials: `Basic ${Buffer.from(process.env.LEGACY_BASIC_AUTH_CREDENTIALS!).toString('base64')}`,
		},
	},
}
