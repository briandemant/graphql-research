/* eslint-disable */
// PLEASE DO NOT EDIT

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { ValidDate, SimpleID, NonEmptyString, UuidV4, Md5 } from '@demo/lib'
import { Context } from '../schema/context'
export type Maybe<T> = T | null

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	/**
	 * scalar NonEmptyString
	 * scalar Slug
	 */
	UuidV4: UuidV4
	DateTime: ValidDate
	ListingXXX: any
	UserXXX: any
}

export type GQLQuery = {
	readonly echoUuid: Maybe<Scalars['UuidV4']>
	readonly isFuture: Maybe<Scalars['Boolean']>
	readonly isPast: Maybe<Scalars['Boolean']>
	readonly now: Maybe<Scalars['DateTime']>
	readonly uuid: Maybe<Scalars['UuidV4']>
	readonly validUuid: Maybe<Scalars['Boolean']>
	readonly welcome: Scalars['String']
}

export type GQLQueryEchoUuidArgs = {
	id: Maybe<Scalars['UuidV4']>
}

export type GQLQueryIsFutureArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type GQLQueryIsPastArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type GQLQueryValidUuidArgs = {
	id: Maybe<Scalars['String']>
}

export type GQLQueryWelcomeArgs = {
	name: Maybe<Scalars['String']>
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
	UuidV4: ResolverTypeWrapper<UuidV4>
	DateTime: ResolverTypeWrapper<ValidDate>
	Boolean: ResolverTypeWrapper<any>
	String: ResolverTypeWrapper<string>
	ListingXXX: ResolverTypeWrapper<any>
	UserXXX: ResolverTypeWrapper<any>
}

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
	Query: {}
	UuidV4: UuidV4
	DateTime: ValidDate
	Boolean: any
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
	echoUuid: Resolver<Maybe<GQLResolversTypes['UuidV4']>, ParentType, ContextType, GQLQueryEchoUuidArgs>
	isFuture: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, GQLQueryIsFutureArgs>
	isPast: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, GQLQueryIsPastArgs>
	now: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>
	uuid: Resolver<Maybe<GQLResolversTypes['UuidV4']>, ParentType, ContextType>
	validUuid: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, GQLQueryValidUuidArgs>
	welcome: Resolver<GQLResolversTypes['String'], ParentType, ContextType, GQLQueryWelcomeArgs>
}

export interface GQLUserXxxScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UserXXX'], any> {
	name: 'UserXXX'
}

export interface GQLUuidV4ScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UuidV4'], any> {
	name: 'UuidV4'
}

export type GQLResolvers<ContextType = Context> = {
	DateTime: GraphQLScalarType
	ListingXXX: GraphQLScalarType
	Query: GQLQueryResolvers<ContextType>
	UserXXX: GraphQLScalarType
	UuidV4: GraphQLScalarType
}
