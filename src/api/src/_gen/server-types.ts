import { ValidDate } from './my-models'
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { ValidDate, Collections } from './my-models'
import { Context } from '../schema/context'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
	{ [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	TrimmedNonEmptyString: any
	DateTime: ValidDate
}

export enum Pong {
	Pong = 'PONG',
}

export type GQLQuery = {
	readonly ping: Maybe<Pong>
	readonly user: Maybe<GQLUser>
	readonly users: ReadonlyArray<GQLUser>
}

export type GQLQueryUserArgs = {
	id: Scalars['ID']
}

export type GQLUser = {
	readonly id: Scalars['ID']
	readonly name: Scalars['TrimmedNonEmptyString']
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
	resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes>

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = ResolversObject<{
	Query: ResolverTypeWrapper<{}>
	PONG: ResolverTypeWrapper<any>
	ID: ResolverTypeWrapper<any>
	User: ResolverTypeWrapper<any>
	TrimmedNonEmptyString: ResolverTypeWrapper<Collections.User>
	String: ResolverTypeWrapper<any>
	Boolean: ResolverTypeWrapper<any>
	DateTime: ResolverTypeWrapper<ValidDate>
}>

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = ResolversObject<{
	Query: {}
	PONG: any
	ID: any
	User: any
	TrimmedNonEmptyString: Collections.User
	String: any
	Boolean: any
	DateTime: ValidDate
}>

export interface GQLDateTimeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['DateTime'], any> {
	name: 'DateTime'
}

export type GQLQueryResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']
> = ResolversObject<{
	ping: Resolver<Maybe<GQLResolversTypes['PONG']>, ParentType, ContextType>
	user: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, RequireFields<GQLQueryUserArgs, 'id'>>
	users: Resolver<ReadonlyArray<GQLResolversTypes['User']>, ParentType, ContextType>
}>

export interface GQLTrimmedNonEmptyStringScalarConfig
	extends GraphQLScalarTypeConfig<GQLResolversTypes['TrimmedNonEmptyString'], any> {
	name: 'TrimmedNonEmptyString'
}

export type GQLUserResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']
> = ResolversObject<{
	id: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['TrimmedNonEmptyString'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

export type GQLResolvers<ContextType = Context> = ResolversObject<{
	DateTime: GraphQLScalarType
	Query: GQLQueryResolvers<ContextType>
	TrimmedNonEmptyString: GraphQLScalarType
	User: GQLUserResolvers<ContextType>
}>
