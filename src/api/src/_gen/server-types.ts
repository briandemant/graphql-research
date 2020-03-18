/* eslint-disable */
// PLEASE DO NOT EDIT
export * from './manual-server-types'
// import { GQLRole } from './manual-server-types'

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { ValidDate, SimpleID, NonEmptyString, UuidV4, Md5 } from '@demo/lib'
import { Context } from '../schema/context'
export type Maybe<T> = T | null
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
	{ [P in K]-?: NonNullable<T[P]> }

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	NonEmptyString: NonEmptyString
	/** scalar Md5 */
	SimpleID: SimpleID
	DateTime: ValidDate
	/** scalar Slug */
	UuidV4: UuidV4
}

export type GQLCategory = GQLEntity & {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly slug: Scalars['NonEmptyString']
	readonly createdAt: Scalars['DateTime']
}

export type GQLCategoryField = GQLEntity & {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly value: Maybe<ReadonlyArray<Maybe<Scalars['NonEmptyString']>>>
}

export type GQLCursorPaginationParams = {
	readonly limit: Maybe<Scalars['Int']>
	readonly after: Maybe<Scalars['NonEmptyString']>
	readonly before: Maybe<Scalars['NonEmptyString']>
}

/**
 * For Edges that have a timestamp,
 * documenting the time of the connection
 */
export type GQLDatedEdge = {
	readonly createdAt: Maybe<Scalars['DateTime']>
}

/** ## Interfaces */
export type GQLEntity = {
	readonly id: Scalars['SimpleID']
}

/** "Saved-Search of listings" owned by User, paginated */
export type GQLFavoriteListingConnection = GQLPaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<GQLFavoriteListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Maybe<GQLListing>>>
	/** Information to aid in pagination. */
	readonly pageInfo: GQLPageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/** Connection details between a "Saved-Search of listings" and a User */
export type GQLFavoriteListingEdge = GQLDatedEdge & {
	readonly node: Maybe<GQLListing>
	readonly createdAt: Maybe<Scalars['DateTime']>
}

export type GQLImage = {
	/** Absolute URL for accessing an image */
	readonly slug: Scalars['NonEmptyString']
	/** TODO: should list the available sizes from ImageSizes */
	readonly sizes: ReadonlyArray<Scalars['NonEmptyString']>
}

export type GQLImageSlugArgs = {
	size?: Maybe<GQLImageSizes>
}

export enum GQLImageSizes {
	Thumb = 'THUMB',
	Small = 'SMALL',
	Medium = 'MEDIUM',
	Large = 'LARGE',
}

export type GQLListing = GQLEntity & {
	/** basic */
	readonly id: Scalars['SimpleID']
	readonly slug: Scalars['NonEmptyString']
	readonly owner: GQLUser
	readonly online: Scalars['Boolean']
	readonly status: GQLListingStatusEnum
	/** textual content */
	readonly title: Scalars['NonEmptyString']
	readonly desc: Scalars['NonEmptyString']
	readonly publicationTitle: Scalars['NonEmptyString']
	readonly publicationDesc: Scalars['NonEmptyString']
	/** pricing */
	readonly price: Scalars['NonEmptyString']
	readonly offersAccepted: Maybe<Scalars['Boolean']>
	readonly vatEnabled: Maybe<Scalars['Boolean']>
	/** relationships */
	readonly category: GQLCategory
	readonly images: Maybe<ReadonlyArray<Maybe<GQLImage>>>
	/** misc */
	readonly type: GQLListingTypeEnum
	readonly homepage: Maybe<Scalars['NonEmptyString']>
	/** contact - might be inherited from owner or listing specific */
	readonly phone: Maybe<Scalars['NonEmptyString']>
	/** location - might be inherited from owner or defined for the listing specifically */
	readonly location: GQLLocation
	/** Product - package, addons, publications */
	readonly productPackage: GQLProductPackage
}

/** Listings owned by User, paginated */
export type GQLListingConnection = GQLPaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<GQLListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Maybe<GQLListing>>>
	/** Information to aid in pagination. */
	readonly pageInfo: GQLPageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/** Connection details between a Listings and a User */
export type GQLListingEdge = GQLDatedEdge & {
	readonly node: Maybe<GQLListing>
	readonly createdAt: Maybe<Scalars['DateTime']>
}

export enum GQLListingOrderEnum {
	CreatedAt = 'CREATED_AT',
	UpdatedAt = 'UPDATED_AT',
	Random = 'RANDOM',
}

export enum GQLListingStatusEnum {
	Active = 'ACTIVE',
	Inactive = 'INACTIVE',
	Expired = 'EXPIRED',
	Draft = 'DRAFT',
}

export enum GQLListingTypeEnum {
	Sell = 'SELL',
	Buy = 'BUY',
	Free = 'FREE',
	Trade = 'TRADE',
}

/** ## Generic (re-usable) types */
export type GQLLocation = {
	readonly address: Maybe<Scalars['NonEmptyString']>
	readonly zipCode: Maybe<Scalars['NonEmptyString']>
	readonly city: Maybe<Scalars['NonEmptyString']>
	readonly country: Maybe<Scalars['NonEmptyString']>
	readonly lat: Maybe<Scalars['NonEmptyString']>
	readonly long: Maybe<Scalars['NonEmptyString']>
}

/** Basic mutation response */
export type GQLMutationResponse = {
	readonly code: Scalars['Int']
	readonly success: Scalars['Boolean']
}

/** Generic pagination info */
export type GQLPageInfo = {
	/**
	 * Indicates if there are more pages to fetch
	 * (contains either page number or cursor or null)
	 */
	readonly next: Maybe<Scalars['NonEmptyString']>
	/**
	 * Indicates if there are any pages prior to the current page
	 * (contains either page number, cursor or null)
	 */
	readonly previous: Maybe<Scalars['NonEmptyString']>
}

export type GQLPagePaginationParams = {
	readonly limit: Maybe<Scalars['Int']>
	readonly page: Maybe<Scalars['Int']>
}

export type GQLPaginatedConnection = {
	/** Information to aid in pagination. */
	readonly pageInfo: GQLPageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/** Addons, for granular tweaking of the exposure rules/features. */
export type GQLProductAddon = GQLEntity & {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
}

/** A product package defines the general exposure rules/features of the Listing. */
export type GQLProductPackage = GQLEntity & {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly addons: Maybe<ReadonlyArray<Maybe<GQLProductAddon>>>
	readonly publications: Maybe<ReadonlyArray<Maybe<GQLProductPackage>>>
}

/**
 * Offline exposure (print) of the Listing.
 * Which publication/newspaper will the Listing appear in.
 */
export type GQLPublication = GQLEntity & {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly from: Scalars['DateTime']
	readonly to: Scalars['DateTime']
}

/** this is just to be able to return something in this separate schema file */
export type GQLQuery = {
	readonly apiVersion: Scalars['String']
	readonly frontPageListings: ReadonlyArray<GQLListing>
	readonly isFuture: Maybe<Scalars['Boolean']>
	readonly isPast: Maybe<Scalars['Boolean']>
	readonly listing: Maybe<GQLListing>
	readonly listings: ReadonlyArray<GQLListing>
	readonly now: Maybe<Scalars['DateTime']>
	readonly user: Maybe<GQLUser>
	readonly utils: Maybe<GQLUtil>
	readonly welcome: Scalars['String']
}

/** this is just to be able to return something in this separate schema file */
export type GQLQueryFrontPageListingsArgs = {
	cursor: Maybe<GQLCursorPaginationParams>
	sortBy?: Maybe<GQLListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

/** this is just to be able to return something in this separate schema file */
export type GQLQueryIsFutureArgs = {
	date: Maybe<Scalars['DateTime']>
}

/** this is just to be able to return something in this separate schema file */
export type GQLQueryIsPastArgs = {
	date: Maybe<Scalars['DateTime']>
}

/** this is just to be able to return something in this separate schema file */
export type GQLQueryListingArgs = {
	id: Scalars['SimpleID']
}

/** this is just to be able to return something in this separate schema file */
export type GQLQueryListingsArgs = {
	cursor: Maybe<GQLCursorPaginationParams>
	sortBy?: Maybe<GQLListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

/** this is just to be able to return something in this separate schema file */
export type GQLQueryUserArgs = {
	id: Scalars['SimpleID']
}

/** this is just to be able to return something in this separate schema file */
export type GQLQueryWelcomeArgs = {
	name: Maybe<Scalars['String']>
}

export enum GQLRole {
	Admin = 'ADMIN',
	User = 'USER',
}

export type GQLUser = GQLEntity & {
	readonly id: Scalars['SimpleID']
	readonly name: Maybe<Scalars['NonEmptyString']>
	readonly email: Maybe<Scalars['NonEmptyString']>
	readonly userName: Maybe<Scalars['NonEmptyString']>
	readonly createdAt: Scalars['DateTime']
	/** Cursor pagination */
	readonly listingConnection: Maybe<GQLListingConnection>
	/** Generic pagination */
	readonly favoriteListingsConnection: Maybe<GQLFavoriteListingConnection>
}

export type GQLUserListingConnectionArgs = {
	cursor: Maybe<GQLCursorPaginationParams>
	sortBy?: Maybe<GQLListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

export type GQLUserFavoriteListingsConnectionArgs = {
	pagination: Maybe<GQLPagePaginationParams>
	sortBy?: Maybe<GQLListingOrderEnum>
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
	String: ResolverTypeWrapper<string>
	CursorPaginationParams: ResolverTypeWrapper<any>
	Int: ResolverTypeWrapper<any>
	NonEmptyString: ResolverTypeWrapper<NonEmptyString>
	ListingOrderEnum: ResolverTypeWrapper<any>
	Boolean: ResolverTypeWrapper<any>
	Listing: ResolverTypeWrapper<any>
	Entity: ResolverTypeWrapper<Omit<ResolverTypeWrapper<any>, 'id'> & { id: GQLResolversTypes['SimpleID'] }>
	SimpleID: ResolverTypeWrapper<SimpleID>
	User: ResolverTypeWrapper<any>
	DateTime: ResolverTypeWrapper<ValidDate>
	ListingConnection: ResolverTypeWrapper<any>
	PaginatedConnection: ResolverTypeWrapper<any>
	PageInfo: ResolverTypeWrapper<any>
	ListingEdge: ResolverTypeWrapper<any>
	DatedEdge: ResolverTypeWrapper<
		Omit<ResolverTypeWrapper<any>, 'createdAt'> & { createdAt: Maybe<GQLResolversTypes['DateTime']> }
	>
	PagePaginationParams: ResolverTypeWrapper<any>
	FavoriteListingConnection: ResolverTypeWrapper<any>
	FavoriteListingEdge: ResolverTypeWrapper<any>
	ListingStatusEnum: ResolverTypeWrapper<any>
	Category: ResolverTypeWrapper<any>
	Image: ResolverTypeWrapper<any>
	ImageSizes: ResolverTypeWrapper<any>
	ListingTypeEnum: ResolverTypeWrapper<any>
	Location: ResolverTypeWrapper<any>
	ProductPackage: ResolverTypeWrapper<any>
	ProductAddon: ResolverTypeWrapper<any>
	Util: ResolverTypeWrapper<any>
	UuidV4: ResolverTypeWrapper<UuidV4>
	Role: ResolverTypeWrapper<any>
	CategoryField: ResolverTypeWrapper<any>
	Publication: ResolverTypeWrapper<any>
	MutationResponse: ResolverTypeWrapper<any>
}

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
	Query: {}
	String: string
	CursorPaginationParams: any
	Int: any
	NonEmptyString: NonEmptyString
	ListingOrderEnum: any
	Boolean: any
	Listing: any
	Entity: Omit<any, 'id'> & { id: GQLResolversParentTypes['SimpleID'] }
	SimpleID: SimpleID
	User: any
	DateTime: ValidDate
	ListingConnection: any
	PaginatedConnection: any
	PageInfo: any
	ListingEdge: any
	DatedEdge: Omit<any, 'createdAt'> & { createdAt: Maybe<GQLResolversParentTypes['DateTime']> }
	PagePaginationParams: any
	FavoriteListingConnection: any
	FavoriteListingEdge: any
	ListingStatusEnum: any
	Category: any
	Image: any
	ImageSizes: any
	ListingTypeEnum: any
	Location: any
	ProductPackage: any
	ProductAddon: any
	Util: any
	UuidV4: UuidV4
	Role: any
	CategoryField: any
	Publication: any
	MutationResponse: any
}

export type GQLAuthDirectiveArgs = { requires?: Maybe<GQLRole> }

export type GQLAuthDirectiveResolver<
	Result,
	Parent,
	ContextType = Context,
	Args = GQLAuthDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type GQLCategoryResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Category'] = GQLResolversParentTypes['Category']
> = {
	id: Resolver<GQLResolversTypes['SimpleID'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	slug: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLCategoryFieldResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['CategoryField'] = GQLResolversParentTypes['CategoryField']
> = {
	id: Resolver<GQLResolversTypes['SimpleID'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	value: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['NonEmptyString']>>>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLDatedEdgeResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['DatedEdge'] = GQLResolversParentTypes['DatedEdge']
> = {
	__resolveType: TypeResolveFn<'ListingEdge' | 'FavoriteListingEdge', ParentType, ContextType>
	createdAt: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>
}

export interface GQLDateTimeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['DateTime'], any> {
	name: 'DateTime'
}

export type GQLEntityResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Entity'] = GQLResolversParentTypes['Entity']
> = {
	__resolveType: TypeResolveFn<
		'Listing' | 'User' | 'Category' | 'ProductPackage' | 'ProductAddon' | 'CategoryField' | 'Publication',
		ParentType,
		ContextType
	>
	id: Resolver<GQLResolversTypes['SimpleID'], ParentType, ContextType>
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

export type GQLImageResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Image'] = GQLResolversParentTypes['Image']
> = {
	slug: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType, RequireFields<GQLImageSlugArgs, 'size'>>
	sizes: Resolver<ReadonlyArray<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLListingResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Listing'] = GQLResolversParentTypes['Listing']
> = {
	id: Resolver<GQLResolversTypes['SimpleID'], ParentType, ContextType>
	slug: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	owner: Resolver<GQLResolversTypes['User'], ParentType, ContextType>
	online: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>
	status: Resolver<GQLResolversTypes['ListingStatusEnum'], ParentType, ContextType>
	title: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	desc: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	publicationTitle: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	publicationDesc: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	price: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	offersAccepted: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>
	vatEnabled: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType>
	category: Resolver<GQLResolversTypes['Category'], ParentType, ContextType>
	images: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['Image']>>>, ParentType, ContextType>
	type: Resolver<GQLResolversTypes['ListingTypeEnum'], ParentType, ContextType>
	homepage: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	phone: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	location: Resolver<GQLResolversTypes['Location'], ParentType, ContextType>
	productPackage: Resolver<GQLResolversTypes['ProductPackage'], ParentType, ContextType>
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
	createdAt: Resolver<Maybe<GQLResolversTypes['DateTime']>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLLocationResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Location'] = GQLResolversParentTypes['Location']
> = {
	address: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	zipCode: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	city: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	country: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	lat: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	long: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLMutationResponseResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['MutationResponse'] = GQLResolversParentTypes['MutationResponse']
> = {
	__resolveType: TypeResolveFn<null, ParentType, ContextType>
	code: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>
	success: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>
}

export interface GQLNonEmptyStringScalarConfig
	extends GraphQLScalarTypeConfig<GQLResolversTypes['NonEmptyString'], any> {
	name: 'NonEmptyString'
}

export type GQLPageInfoResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['PageInfo'] = GQLResolversParentTypes['PageInfo']
> = {
	next: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	previous: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLPaginatedConnectionResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['PaginatedConnection'] = GQLResolversParentTypes['PaginatedConnection']
> = {
	__resolveType: TypeResolveFn<'ListingConnection' | 'FavoriteListingConnection', ParentType, ContextType>
	pageInfo: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>
	totalCount: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>
}

export type GQLProductAddonResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['ProductAddon'] = GQLResolversParentTypes['ProductAddon']
> = {
	id: Resolver<GQLResolversTypes['SimpleID'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLProductPackageResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['ProductPackage'] = GQLResolversParentTypes['ProductPackage']
> = {
	id: Resolver<GQLResolversTypes['SimpleID'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	addons: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['ProductAddon']>>>, ParentType, ContextType>
	publications: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['ProductPackage']>>>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLPublicationResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Publication'] = GQLResolversParentTypes['Publication']
> = {
	id: Resolver<GQLResolversTypes['SimpleID'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	from: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	to: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLQueryResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']
> = {
	apiVersion: Resolver<GQLResolversTypes['String'], ParentType, ContextType>
	frontPageListings: Resolver<
		ReadonlyArray<GQLResolversTypes['Listing']>,
		ParentType,
		ContextType,
		RequireFields<GQLQueryFrontPageListingsArgs, 'sortBy' | 'reverse'>
	>
	isFuture: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, GQLQueryIsFutureArgs>
	isPast: Resolver<Maybe<GQLResolversTypes['Boolean']>, ParentType, ContextType, GQLQueryIsPastArgs>
	listing: Resolver<
		Maybe<GQLResolversTypes['Listing']>,
		ParentType,
		ContextType,
		RequireFields<GQLQueryListingArgs, 'id'>
	>
	listings: Resolver<
		ReadonlyArray<GQLResolversTypes['Listing']>,
		ParentType,
		ContextType,
		RequireFields<GQLQueryListingsArgs, 'sortBy' | 'reverse'>
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
	name: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	email: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	userName: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	listingConnection: Resolver<
		Maybe<GQLResolversTypes['ListingConnection']>,
		ParentType,
		ContextType,
		RequireFields<GQLUserListingConnectionArgs, 'sortBy' | 'reverse'>
	>
	favoriteListingsConnection: Resolver<
		Maybe<GQLResolversTypes['FavoriteListingConnection']>,
		ParentType,
		ContextType,
		RequireFields<GQLUserFavoriteListingsConnectionArgs, 'sortBy' | 'reverse'>
	>
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
	Category: GQLCategoryResolvers<ContextType>
	CategoryField: GQLCategoryFieldResolvers<ContextType>
	DatedEdge: GQLDatedEdgeResolvers
	DateTime: GraphQLScalarType
	Entity: GQLEntityResolvers
	FavoriteListingConnection: GQLFavoriteListingConnectionResolvers<ContextType>
	FavoriteListingEdge: GQLFavoriteListingEdgeResolvers<ContextType>
	Image: GQLImageResolvers<ContextType>
	Listing: GQLListingResolvers<ContextType>
	ListingConnection: GQLListingConnectionResolvers<ContextType>
	ListingEdge: GQLListingEdgeResolvers<ContextType>
	Location: GQLLocationResolvers<ContextType>
	MutationResponse: GQLMutationResponseResolvers
	NonEmptyString: GraphQLScalarType
	PageInfo: GQLPageInfoResolvers<ContextType>
	PaginatedConnection: GQLPaginatedConnectionResolvers
	ProductAddon: GQLProductAddonResolvers<ContextType>
	ProductPackage: GQLProductPackageResolvers<ContextType>
	Publication: GQLPublicationResolvers<ContextType>
	Query: GQLQueryResolvers<ContextType>
	SimpleID: GraphQLScalarType
	User: GQLUserResolvers<ContextType>
	Util: GQLUtilResolvers<ContextType>
	UuidV4: GraphQLScalarType
}

export type GQLDirectiveResolvers<ContextType = Context> = {
	auth: GQLAuthDirectiveResolver<any, any, ContextType>
}
