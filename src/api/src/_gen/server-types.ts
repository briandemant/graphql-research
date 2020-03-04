/* eslint-disable */
// PLEASE DO NOT EDIT
export * from './manual-server-types'
// import { GQLRole } from './manual-server-types'

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { ValidDate, SimpleID, NonEmptyString, UuidV4, Md5 } from '@demo/lib'
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
	DateTime: ValidDate
	/** scalar Md5 */
	SimpleID: SimpleID
	NonEmptyString: NonEmptyString
	/** scalar Slug */
	UuidV4: UuidV4
}

export type GQLListing = {
	readonly id: Scalars['SimpleID']
	readonly title: Scalars['NonEmptyString']
	/** slug: Slug! */
	readonly owner: GQLUser
}

export type GQLQuery = {
	readonly isFuture: Maybe<Scalars['Boolean']>
	readonly isPast: Maybe<Scalars['Boolean']>
	readonly listing: Maybe<GQLListing>
	readonly now: Maybe<Scalars['DateTime']>
	readonly user: Maybe<GQLUser>
	readonly utils: Maybe<GQLUtil>
	readonly welcome: Scalars['String']
}

export type GQLQueryIsFutureArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type GQLQueryIsPastArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type GQLQueryListingArgs = {
	id: Scalars['SimpleID']
}

export type GQLQueryUserArgs = {
	id: Scalars['SimpleID']
}

export type GQLQueryWelcomeArgs = {
	name: Maybe<Scalars['String']>
}

export enum GQLRole {
	Admin = 'ADMIN',
	User = 'USER',
}

export type GQLUser = {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
}

export type GQLUtil = {
	readonly uuid: Maybe<Scalars['UuidV4']>
	readonly validUuid: Maybe<Scalars['Boolean']>
	readonly echoUuid: Maybe<Scalars['UuidV4']>
	readonly newField: Maybe<Scalars['String']>
	readonly oldField: Maybe<Scalars['String']>
}

export type GQLUtilValidUuidArgs = {
	idOrNot: Scalars['String']
}

export type GQLUtilEchoUuidArgs = {
	id: Scalars['UuidV4']
}

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
export type GQLResolversTypes = {
	Query: ResolverTypeWrapper<{}>
	DateTime: ResolverTypeWrapper<ValidDate>
	Boolean: ResolverTypeWrapper<any>
	SimpleID: ResolverTypeWrapper<SimpleID>
	Listing: ResolverTypeWrapper<any>
	NonEmptyString: ResolverTypeWrapper<NonEmptyString>
	User: ResolverTypeWrapper<any>
	Util: ResolverTypeWrapper<any>
	UuidV4: ResolverTypeWrapper<UuidV4>
	String: ResolverTypeWrapper<string>
	Role: ResolverTypeWrapper<any>
}

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
	Query: {}
	DateTime: ValidDate
	Boolean: any
	SimpleID: SimpleID
	Listing: any
	NonEmptyString: NonEmptyString
	User: any
	Util: any
	UuidV4: UuidV4
	String: string
	Role: any
}

export type GQLAuthDirectiveArgs = { requires?: Maybe<GQLRole> }

export type GQLAuthDirectiveResolver<
	Result,
	Parent,
	ContextType = Context,
	Args = GQLAuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export interface GQLDateTimeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['DateTime'], any> {
	name: 'DateTime'
}

export type GQLListingResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Listing'] = GQLResolversParentTypes['Listing']
> = {
	id: Resolver<GQLResolversTypes['SimpleID'], ParentType, ContextType>
	title: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	owner: Resolver<GQLResolversTypes['User'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export interface GQLNonEmptyStringScalarConfig
	extends GraphQLScalarTypeConfig<GQLResolversTypes['NonEmptyString'], any> {
	name: 'NonEmptyString'
}

export type GQLQueryResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']
> = {
	isFuture: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, GQLQueryIsFutureArgs>
	isPast: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, GQLQueryIsPastArgs>
	listing: Resolver<
		Maybe<GQLResolversTypes['Listing']>,
		ParentType,
		ContextType,
		RequireFields<GQLQueryListingArgs, 'id'>
	>
	now: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>
	user: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, RequireFields<GQLQueryUserArgs, 'id'>>
	utils: Resolver<Maybe<GQLResolversTypes['Util']>, ParentType, ContextType>
	welcome: Resolver<GQLResolversTypes['String'], ParentType, ContextType, GQLQueryWelcomeArgs>
}

export interface GQLSimpleIdScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['SimpleID'], any> {
	name: 'SimpleID'
}

export type GQLUserResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']
> = {
	id: Resolver<GQLResolversTypes['SimpleID'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLUtilResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Util'] = GQLResolversParentTypes['Util']
> = {
	uuid: Resolver<Maybe<GQLResolversTypes['UuidV4']>, ParentType, ContextType>
	validUuid: Resolver<
		Maybe<GQLResolversTypes['Boolean']>,
		ParentType,
		ContextType,
		RequireFields<GQLUtilValidUuidArgs, 'idOrNot'>
	>
	echoUuid: Resolver<
		Maybe<GQLResolversTypes['UuidV4']>,
		ParentType,
		ContextType,
		RequireFields<GQLUtilEchoUuidArgs, 'id'>
	>
	newField: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>
	oldField: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export interface GQLUuidV4ScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UuidV4'], any> {
	name: 'UuidV4'
}

export type GQLResolvers<ContextType = Context> = {
	DateTime: GraphQLScalarType
	Listing: GQLListingResolvers<ContextType>
	NonEmptyString: GraphQLScalarType
	Query: GQLQueryResolvers<ContextType>
	SimpleID: GraphQLScalarType
	User: GQLUserResolvers<ContextType>
	Util: GQLUtilResolvers<ContextType>
	UuidV4: GraphQLScalarType
}

export type GQLDirectiveResolvers<ContextType = Context> = {
	auth: GQLAuthDirectiveResolver<any, any, ContextType>
}
