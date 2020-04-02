import { Buffer } from 'buffer'
import * as dotenv from 'dotenv-flow'

dotenv.config({
	path: __dirname + '/../../../',
})

if (process.env.NODE_ENV === 'test') {
	// dot env preserves real env vars over .env
	const fs = require('fs')
	const dotenv = require('dotenv')
	const envConfig = dotenv.parse(fs.readFileSync(__dirname + '/../../../.env.test.overrides'))
	for (let k in envConfig) {
		process.env[k] = envConfig[k]
	}
}

let missing = ['DEV_PUBLIC_KEY', 'LEGACY_BASIC_AUTH_CREDENTIALS']
	.filter(key => typeof process.env[key] !== 'string')

/* istanbul ignore next */
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
