/* eslint-disable */
// PLEASE DO NOT EDIT
export type ResolverType<TObj, TProp extends keyof TObj> = TObj[TProp]

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
	/**
	 * scalar NonEmptyString
	 * scalar Slug
	 */
	UuidV4: UuidV4
	ListingXXX: any
	UserXXX: any
}

export type GQLQuery = {
	readonly isFuture: Maybe<Scalars['Boolean']>
	readonly isPast: Maybe<Scalars['Boolean']>
	readonly now: Maybe<Scalars['DateTime']>
	readonly utils: Maybe<GQLUtil>
	readonly welcome: Scalars['String']
}

export type GQLQueryIsFutureArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type GQLQueryIsPastArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type GQLQueryWelcomeArgs = {
	name: Maybe<Scalars['String']>
}

export type GQLUtil = {
	readonly uuid: Maybe<Scalars['UuidV4']>
	readonly validUuid: Maybe<Scalars['Boolean']>
	readonly echoUuid: Maybe<Scalars['UuidV4']>
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
	Util: ResolverTypeWrapper<any>
	UuidV4: ResolverTypeWrapper<UuidV4>
	String: ResolverTypeWrapper<string>
	ListingXXX: ResolverTypeWrapper<any>
	UserXXX: ResolverTypeWrapper<any>
}

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
	Query: {}
	DateTime: ValidDate
	Boolean: any
	Util: any
	UuidV4: UuidV4
	String: string
	ListingXXX: any
	UserXXX: any
}

export interface GQLDateTimeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['DateTime'], any> {
	name: 'DateTime'
}

export interface GQLListingXxxScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['ListingXXX'], any> {
	name: 'ListingXXX'
}

export type GQLQueryResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']
> = {
	isFuture: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, GQLQueryIsFutureArgs>
	isPast: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, GQLQueryIsPastArgs>
	now: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>
	utils: Resolver<Maybe<GQLResolversTypes['Util']>, ParentType, ContextType>
	welcome: Resolver<GQLResolversTypes['String'], ParentType, ContextType, GQLQueryWelcomeArgs>
}

export interface GQLUserXxxScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UserXXX'], any> {
	name: 'UserXXX'
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
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export interface GQLUuidV4ScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UuidV4'], any> {
	name: 'UuidV4'
}

export type GQLResolvers<ContextType = Context> = {
	DateTime: GraphQLScalarType
	ListingXXX: GraphQLScalarType
	Query: GQLQueryResolvers<ContextType>
	UserXXX: GraphQLScalarType
	Util: GQLUtilResolvers<ContextType>
	UuidV4: GraphQLScalarType
}
