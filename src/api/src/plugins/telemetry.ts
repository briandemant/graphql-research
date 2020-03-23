import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { MeterProvider } from '@opentelemetry/metrics'
import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../schemaDemo/context'

let prometheusPort = 2302
const promExporter = new PrometheusExporter({ port: prometheusPort, startServer: true }, () => {
	console.log('prometheus scrape endpoint: http://localhost:' + prometheusPort + '/metrics')
})

// Initialize the Meter to capture measurements in various ways.
const meter = new MeterProvider().getMeter('what?')
meter.addExporter(promExporter)
const reqCounter = meter.createCounter('graphql_requests', {
	labelKeys: ['pid', 'env'],
	description: 'Example of a counter',
})

const labels = {
	pid: `${process.pid}`,
	env: `${process.env.NODE_ENV}`,
}

const boundReqCounter = reqCounter.bind(meter.labels(labels))

const resolverCounter = meter.createCounter('graphql_resolver_executions', {
	labelKeys: ['pid', 'env', 'name', 'parent'].sort(),
	description: 'Example of a counter',
})

export const telemetryMiddleware = async (
	resolve: any,
	parent: any,
	args: any,
	context: Context,
	info: GraphQLResolveInfo
) => {

	if (!info.path.prev) {
		// add 1 to requests
		boundReqCounter.add(1)
	}

	const boundResolverCounter = resolverCounter.bind(
		// meter.labels({ ...labels, name: info.fieldName, prev: info.parentType.name })
		meter.labels({ ...labels, name: info.fieldName, parent: info.parentType.name })
	)
	boundResolverCounter.add(1)

	// only call resolver if parent does NOT supply the result
	if (typeof parent === 'undefined' || typeof parent[info.fieldName] === 'undefined') {
		return await resolve(parent, args, { ...context, meter: meter }, info)
	} else {
		// we don't need to call resolver as parent has info available
		return parent[info.fieldName]
	}
}
