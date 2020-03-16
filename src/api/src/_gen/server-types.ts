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

export type GQLCursorPaginationParams = {
	readonly size: Maybe<Scalars['Int']>
	readonly after: Maybe<Scalars['String']>
	readonly before: Maybe<Scalars['String']>
}

export type GQLFavoriteListingConnection = {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<GQLFavoriteListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Maybe<GQLListing>>>
	/** Information to aid in pagination. */
	readonly pageInfo: GQLPageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

export type GQLFavoriteListingEdge = {
	readonly node: Maybe<GQLListing>
	readonly createdAt: Maybe<Scalars['DateTime']>
}

export type GQLListing = {
	readonly id: Scalars['SimpleID']
	readonly title: Scalars['NonEmptyString']
	readonly slug: Scalars['NonEmptyString']
	readonly owner: GQLUser
}

/** supported cursor is the same as order key */
export type GQLListingConnection = {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<GQLListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Maybe<GQLListing>>>
	/** Information to aid in pagination. */
	readonly pageInfo: GQLPageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

export type GQLListingEdge = {
	readonly node: Maybe<GQLListing>
}

export type GQLListingFavorite = {
	readonly listing: GQLListing
	readonly user: GQLUser
	readonly createdAt: Maybe<Scalars['DateTime']>
}

/**
 * input DateTimeQuery {
 * 	date:Int!
 * 	operator: QueryOperator
 * }
 *
 * input ListingFilterParams {
 * 	and:Boolean = true
 * 	term:String
 * 	createdAt: DateTimeQuery
 * 	updatedAt: DateTimeQuery
 * 	nearLocation: LocationInput
 * }
 */
export enum GQLListingOrderEnum {
	CreatedAt = 'CREATED_AT',
	UpdatedAt = 'UPDATED_AT',
}

/** Generic pagination info */
export type GQLPageInfo = {
	/** Indicates if there are more pages to fetch */
	readonly nextPage: Maybe<Scalars['String']>
	/** Indicates if there are any pages prior to the current page */
	readonly previousPage: Maybe<Scalars['String']>
}

export type GQLPagePaginationParams = {
	readonly size: Maybe<Scalars['Int']>
	readonly page: Maybe<Scalars['Int']>
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

export type GQLSortParams = {
	readonly orderBy: Maybe<Scalars['String']>
	readonly reverse: Maybe<Scalars['Boolean']>
}

export type GQLUser = {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly listings: ReadonlyArray<GQLListing>
	readonly listingConnection: GQLListingConnection
	/** listingList: ListingList! */
	readonly luckyNumber: Maybe<Scalars['Int']>
}

export type GQLUserListingConnectionArgs = {
	term: Maybe<Scalars['String']>
	cursor: Maybe<GQLCursorPaginationParams>
	sortBy: Maybe<GQLListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
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
	String: ResolverTypeWrapper<string>
	CursorPaginationParams: ResolverTypeWrapper<any>
	Int: ResolverTypeWrapper<any>
	ListingOrderEnum: ResolverTypeWrapper<any>
	ListingConnection: ResolverTypeWrapper<any>
	ListingEdge: ResolverTypeWrapper<any>
	PageInfo: ResolverTypeWrapper<any>
	Util: ResolverTypeWrapper<any>
	UuidV4: ResolverTypeWrapper<UuidV4>
	Role: ResolverTypeWrapper<any>
	PagePaginationParams: ResolverTypeWrapper<any>
	SortParams: ResolverTypeWrapper<any>
	FavoriteListingConnection: ResolverTypeWrapper<any>
	FavoriteListingEdge: ResolverTypeWrapper<any>
	ListingFavorite: ResolverTypeWrapper<any>
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
	String: string
	CursorPaginationParams: any
	Int: any
	ListingOrderEnum: any
	ListingConnection: any
	ListingEdge: any
	PageInfo: any
	Util: any
	UuidV4: UuidV4
	Role: any
	PagePaginationParams: any
	SortParams: any
	FavoriteListingConnection: any
	FavoriteListingEdge: any
	ListingFavorite: any
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

export type GQLFavoriteListingConnectionResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['FavoriteListingConnection'] = GQLResolversParentTypes['FavoriteListingConnection']
> = {
	edges: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['FavoriteListingEdge']>>>, ParentType, ContextType>
	nodes: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['Listing']>>>, ParentType, ContextType>
	pageInfo: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>
	totalCount: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLFavoriteListingEdgeResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['FavoriteListingEdge'] = GQLResolversParentTypes['FavoriteListingEdge']
> = {
	node: Resolver<Maybe<GQLResolversTypes['Listing']>, ParentType, ContextType>
	createdAt: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLListingResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Listing'] = GQLResolversParentTypes['Listing']
> = {
	id: Resolver<GQLResolversTypes['SimpleID'], ParentType, ContextType>
	title: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	slug: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	owner: Resolver<GQLResolversTypes['User'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLListingConnectionResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['ListingConnection'] = GQLResolversParentTypes['ListingConnection']
> = {
	edges: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['ListingEdge']>>>, ParentType, ContextType>
	nodes: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['Listing']>>>, ParentType, ContextType>
	pageInfo: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>
	totalCount: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLListingEdgeResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['ListingEdge'] = GQLResolversParentTypes['ListingEdge']
> = {
	node: Resolver<Maybe<GQLResolversTypes['Listing']>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLListingFavoriteResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['ListingFavorite'] = GQLResolversParentTypes['ListingFavorite']
> = {
	listing: Resolver<GQLResolversTypes['Listing'], ParentType, ContextType>
	user: Resolver<GQLResolversTypes['User'], ParentType, ContextType>
	createdAt: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export interface GQLNonEmptyStringScalarConfig
	extends GraphQLScalarTypeConfig<GQLResolversTypes['NonEmptyString'], any> {
	name: 'NonEmptyString'
}

export type GQLPageInfoResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['PageInfo'] = GQLResolversParentTypes['PageInfo']
> = {
	nextPage: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>
	previousPage: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
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
	listings: Resolver<ReadonlyArray<GQLResolversTypes['Listing']>, ParentType, ContextType>
	listingConnection: Resolver<
		GQLResolversTypes['ListingConnection'],
		ParentType,
		ContextType,
		RequireFields<GQLUserListingConnectionArgs, 'reverse'>
	>
	luckyNumber: Resolver<Maybe<GQLResolversTypes['Int']>, ParentType, ContextType>
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
	FavoriteListingConnection: GQLFavoriteListingConnectionResolvers<ContextType>
	FavoriteListingEdge: GQLFavoriteListingEdgeResolvers<ContextType>
	Listing: GQLListingResolvers<ContextType>
	ListingConnection: GQLListingConnectionResolvers<ContextType>
	ListingEdge: GQLListingEdgeResolvers<ContextType>
	ListingFavorite: GQLListingFavoriteResolvers<ContextType>
	NonEmptyString: GraphQLScalarType
	PageInfo: GQLPageInfoResolvers<ContextType>
	Query: GQLQueryResolvers<ContextType>
	SimpleID: GraphQLScalarType
	User: GQLUserResolvers<ContextType>
	Util: GQLUtilResolvers<ContextType>
	UuidV4: GraphQLScalarType
}

export type GQLDirectiveResolvers<ContextType = Context> = {
	auth: GQLAuthDirectiveResolver<any, any, ContextType>
}
