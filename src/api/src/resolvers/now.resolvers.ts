import { ValidDate } from '@demo/lib'
import { GQLQueryResolvers } from '../_gen/server-types'

type NowQueryResolver = GQLQueryResolvers['now']
type FutureQueryResolver = GQLQueryResolvers['isFuture']
type PastQueryResolver = GQLQueryResolvers['isPast']

const now: NowQueryResolver = (parent, args, context, info) => {
	return new ValidDate()
}

const isFuture: FutureQueryResolver = (parent, { date }, context, info) => {
	if (!date) throw ValidDate.ERR_INVALID_DATE
	return date.isLargerThan(new ValidDate())
}
const isPast: PastQueryResolver = (parent, { date }, context, info) => {
	if (!date) throw ValidDate.ERR_INVALID_DATE
	return new ValidDate().isLargerThan(date)
}

export const resolvers = { Query: { now, isFuture, isPast } }
