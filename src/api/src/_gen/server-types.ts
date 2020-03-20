/* eslint-disable */
// PLEASE DO NOT EDIT
export * from './manual-server-types'
// import { GQLRole } from './manual-server-types'

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { ValidDate, SimpleID, NonEmptyString, UuidV4, Md5 } from '@demo/lib'
import { Context } from '../schemaV2/context'
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
	/** scalar Slug */
	UuidV4: UuidV4
	DateTime: ValidDate
	/** scalar Md5 */
	Email: any
	URL: any
}

export type GQLCategory = GQLEntity & {
	readonly id: Scalars['UuidV4']
	readonly name: Scalars['NonEmptyString']
	/** category URL path */
	readonly slug: Scalars['NonEmptyString']
	/** hierarchy */
	readonly parents: Maybe<ReadonlyArray<GQLCategory>>
	readonly children: Maybe<ReadonlyArray<GQLCategory>>
	readonly isLeaf: Scalars['Boolean']
	/** meta */
	readonly isCars: Scalars['Boolean']
	readonly isPersonal: Scalars['Boolean']
	readonly nemIdRequired: Scalars['Boolean']
	/** relationships */
	readonly listingConnection: Maybe<GQLListingConnection>
	/** timestamps */
	readonly createdAt: Scalars['DateTime']
	readonly updatedAt: Scalars['DateTime']
}

export type GQLCategoryListingConnectionArgs = {
	cursor: Maybe<GQLCursorPaginationParams>
	sortBy?: Maybe<GQLListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

/**
 * TODO: Basic implementation, for now.
 * Needs to be refactored, to support different types of values, etc.
 */
export type GQLCategoryField = GQLEntity & {
	readonly id: Scalars['UuidV4']
	readonly name: Scalars['NonEmptyString']
	readonly value: Maybe<ReadonlyArray<Scalars['NonEmptyString']>>
}

export type GQLCountry = GQLEntity & {
	readonly id: Scalars['UuidV4']
	readonly name: Scalars['NonEmptyString']
	/** ISO 3166-1 alpha-2 */
	readonly code: Scalars['NonEmptyString']
	/** Phone prefix (+45, +44, etc.) */
	readonly callingCode: Scalars['NonEmptyString']
	readonly callingCodeValidationRegex: Scalars['NonEmptyString']
	/** meta */
	readonly createdAt: Scalars['DateTime']
	readonly updatedAt: Scalars['DateTime']
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
	readonly createdAt: Scalars['DateTime']
}

/** ## Interfaces */
export type GQLEntity = {
	readonly id: Scalars['UuidV4']
}

/**
 * TODO: Move to separate FavoriteListing type
 * "Saved-Search of listings" belonging to User, paginated
 */
export type GQLFavoriteListingConnection = GQLPaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<GQLFavoriteListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<GQLListing>>
	/** Information to aid in pagination. */
	readonly pageInfo: GQLPageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/**
 * TODO: Move to separate FavoriteListing type
 * Connection details between a "Saved-Search of listings" and a User
 */
export type GQLFavoriteListingEdge = GQLDatedEdge & {
	readonly node: Maybe<GQLListing>
	readonly createdAt: Scalars['DateTime']
}

export enum GQLFrontpageGroupTypeEnum {
	Default = 'DEFAULT',
	Newest = 'NEWEST',
	User = 'USER',
}

export enum GQLGenericSortBy {
	CreatedAt = 'CREATED_AT',
	UpdatedAt = 'UPDATED_AT',
}

export type GQLImage = {
	/** Absolute URL for accessing an image */
	readonly url: Scalars['NonEmptyString']
	readonly size: GQLImageSizes
}

export type GQLImageUrlArgs = {
	size?: Maybe<GQLImageSizes>
}

export enum GQLImageSizes {
	Thumb = 'THUMB',
	Small = 'SMALL',
	Medium = 'MEDIUM',
	Large = 'LARGE',
}

export type GQLLabel = GQLEntity & {
	readonly id: Scalars['UuidV4']
}

export type GQLLabelEdge = GQLDatedEdge & {
	readonly node: Maybe<GQLLabel>
	readonly createdAt: Scalars['DateTime']
}

/** Labels belonging to User, paginated */
export type GQLLabelsConnection = GQLPaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<GQLLabelEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<GQLLabel>>
	/** Information to aid in pagination. */
	readonly pageInfo: GQLPageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

export type GQLListing = GQLEntity & {
	/** basic */
	readonly id: Scalars['UuidV4']
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
	/** Bizz user only */
	readonly vatEnabled: Maybe<Scalars['Boolean']>
	/** relationships */
	readonly category: GQLCategory
	readonly primaryImage: Maybe<GQLImage>
	readonly images: Maybe<ReadonlyArray<GQLImage>>
	/** misc */
	readonly type: GQLListingTypeEnum
	/** Bizz user only */
	readonly homepage: Maybe<Scalars['NonEmptyString']>
	/** contact - (might be inherited from owner or listing specific) */
	readonly phone: Maybe<Scalars['NonEmptyString']>
	/** location - (might be inherited from owner or defined for the listing specifically) */
	readonly location: GQLLocation
	/** Product - package, addons, publications */
	readonly productPackage: GQLProductPackage
}

/** Listing connection, paginated */
export type GQLListingConnection = GQLPaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<GQLListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<GQLListing>>
	/** Information to aid in pagination. */
	readonly pageInfo: GQLPageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/** Connection details between a Listings and an Entity */
export type GQLListingEdge = GQLDatedEdge & {
	readonly node: Maybe<GQLListing>
	readonly createdAt: Scalars['DateTime']
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
	/** Properties (Apartments, houses, etc.) */
	Lease = 'LEASE',
	/** Things (Cars, machines, etc.) */
	Rent = 'RENT',
	Other = 'OTHER',
}

/** ## Generic (re-usable) types */
export type GQLLocation = {
	readonly address: Maybe<Scalars['NonEmptyString']>
	readonly zipCode: Maybe<Scalars['NonEmptyString']>
	readonly city: Maybe<Scalars['NonEmptyString']>
	readonly country: GQLCountry
	readonly lat: Maybe<Scalars['NonEmptyString']>
	readonly long: Maybe<Scalars['NonEmptyString']>
}

export type GQLMessage = GQLEntity & {
	readonly id: Scalars['UuidV4']
}

export type GQLMessageEdge = GQLDatedEdge & {
	readonly node: Maybe<GQLMessage>
	readonly createdAt: Scalars['DateTime']
}

/** Messages belonging to a User, paginated */
export type GQLMessagesConnection = GQLPaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<GQLMessageEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<GQLMessage>>
	/** Information to aid in pagination. */
	readonly pageInfo: GQLPageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

export type GQLMutationResponse = {
	readonly code: GQLResponseCodeEnum
	readonly success: Scalars['Boolean']
	readonly data: GQLEntity
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

export type GQLPhone = GQLEntity & {
	readonly id: Scalars['UuidV4']
	readonly country: GQLCountry
	readonly value: Scalars['NonEmptyString']
	/** meta */
	readonly createdAt: Scalars['DateTime']
	readonly updatedAt: Scalars['DateTime']
}

/** Addons, for granular tweaking of the exposure rules/features. */
export type GQLProductAddon = GQLEntity & {
	readonly id: Scalars['UuidV4']
	readonly sku: Scalars['NonEmptyString']
	readonly name: Scalars['NonEmptyString']
}

/** A product package defines the general exposure rules/features of the Listing. */
export type GQLProductPackage = GQLEntity & {
	readonly id: Scalars['UuidV4']
	readonly sku: Scalars['NonEmptyString']
	readonly name: Scalars['NonEmptyString']
	readonly addons: Maybe<ReadonlyArray<GQLProductAddon>>
	readonly publications: Maybe<ReadonlyArray<GQLPublication>>
}

/**
 * Offline exposure (print) of the Listing.
 * Which publication/newspaper will the Listing appear in.
 */
export type GQLPublication = GQLEntity & {
	readonly id: Scalars['UuidV4']
	readonly sku: Scalars['NonEmptyString']
	readonly name: Scalars['NonEmptyString']
	readonly from: Scalars['DateTime']
	readonly to: Scalars['DateTime']
}

/** this is just to be able to return something in this separate schema file */
export type GQLQuery = {
	readonly apiVersion: Scalars['String']
	readonly frontPageListings: ReadonlyArray<GQLListing>
	readonly listing: Maybe<GQLListing>
	readonly listings: ReadonlyArray<GQLListing>
	readonly user: Maybe<GQLUser>
}

/** this is just to be able to return something in this separate schema file */
export type GQLQueryFrontPageListingsArgs = {
	cursor: Maybe<GQLCursorPaginationParams>
	ofGroup?: Maybe<GQLFrontpageGroupTypeEnum>
	sortBy?: Maybe<GQLListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

/** this is just to be able to return something in this separate schema file */
export type GQLQueryListingArgs = {
	id: Scalars['UuidV4']
}

/** this is just to be able to return something in this separate schema file */
export type GQLQueryListingsArgs = {
	cursor: Maybe<GQLCursorPaginationParams>
	sortBy?: Maybe<GQLListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

/** this is just to be able to return something in this separate schema file */
export type GQLQueryUserArgs = {
	id: Scalars['UuidV4']
}

export type GQLReceipt = GQLEntity & {
	readonly id: Scalars['UuidV4']
	readonly price: Scalars['Int']
	readonly slug: Scalars['NonEmptyString']
	readonly createdAt: Scalars['DateTime']
}

export type GQLReceiptEdge = GQLDatedEdge & {
	readonly node: Maybe<GQLReceipt>
	readonly createdAt: Scalars['DateTime']
}

/** Receipts belonging to User, paginated */
export type GQLReceiptsConnection = GQLPaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<GQLReceiptEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<GQLReceipt>>
	/** Information to aid in pagination. */
	readonly pageInfo: GQLPageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/** Bare minium mutation response */
export enum GQLResponseCodeEnum {
	Ok = 'OK',
	NotFound = 'NOT_FOUND',
	Error = 'ERROR',
}

export enum GQLRole {
	Admin = 'ADMIN',
	User = 'USER',
}

export type GQLUser = GQLEntity & {
	readonly id: Scalars['UuidV4']
	readonly name: Maybe<Scalars['NonEmptyString']>
	readonly email: Maybe<Scalars['NonEmptyString']>
	readonly userName: Maybe<Scalars['NonEmptyString']>
	readonly createdAt: Scalars['DateTime']
	readonly listingConnection: Maybe<GQLListingConnection>
	readonly favoriteListingsConnection: Maybe<GQLFavoriteListingConnection>
	readonly labelsConnection: Maybe<GQLLabelsConnection>
	readonly receiptsConnection: Maybe<GQLReceiptsConnection>
	/** TODO: Needs more args to separate type of messages (own, replies from others, etc.) */
	readonly messagesConnection: Maybe<GQLMessagesConnection>
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

export type GQLUserLabelsConnectionArgs = {
	pagination: Maybe<GQLPagePaginationParams>
	sortBy?: Maybe<GQLGenericSortBy>
	reverse?: Maybe<Scalars['Boolean']>
}

export type GQLUserReceiptsConnectionArgs = {
	pagination: Maybe<GQLPagePaginationParams>
	sortBy?: Maybe<GQLGenericSortBy>
	reverse?: Maybe<Scalars['Boolean']>
}

export type GQLUserMessagesConnectionArgs = {
	pagination: Maybe<GQLPagePaginationParams>
	sortBy?: Maybe<GQLGenericSortBy>
	reverse?: Maybe<Scalars['Boolean']>
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
	FrontpageGroupTypeEnum: ResolverTypeWrapper<any>
	ListingOrderEnum: ResolverTypeWrapper<any>
	Boolean: ResolverTypeWrapper<any>
	Listing: ResolverTypeWrapper<any>
	Entity: ResolverTypeWrapper<Omit<ResolverTypeWrapper<any>, 'id'> & { id: GQLResolversTypes['UuidV4'] }>
	UuidV4: ResolverTypeWrapper<UuidV4>
	User: ResolverTypeWrapper<any>
	DateTime: ResolverTypeWrapper<ValidDate>
	ListingConnection: ResolverTypeWrapper<any>
	PaginatedConnection: ResolverTypeWrapper<any>
	PageInfo: ResolverTypeWrapper<any>
	ListingEdge: ResolverTypeWrapper<any>
	DatedEdge: ResolverTypeWrapper<
		Omit<ResolverTypeWrapper<any>, 'createdAt'> & { createdAt: GQLResolversTypes['DateTime'] }
	>
	PagePaginationParams: ResolverTypeWrapper<any>
	FavoriteListingConnection: ResolverTypeWrapper<any>
	FavoriteListingEdge: ResolverTypeWrapper<any>
	GenericSortBy: ResolverTypeWrapper<any>
	LabelsConnection: ResolverTypeWrapper<any>
	LabelEdge: ResolverTypeWrapper<any>
	Label: ResolverTypeWrapper<any>
	ReceiptsConnection: ResolverTypeWrapper<any>
	ReceiptEdge: ResolverTypeWrapper<any>
	Receipt: ResolverTypeWrapper<any>
	MessagesConnection: ResolverTypeWrapper<any>
	MessageEdge: ResolverTypeWrapper<any>
	Message: ResolverTypeWrapper<any>
	ListingStatusEnum: ResolverTypeWrapper<any>
	Category: ResolverTypeWrapper<any>
	Image: ResolverTypeWrapper<any>
	ImageSizes: ResolverTypeWrapper<any>
	ListingTypeEnum: ResolverTypeWrapper<any>
	Location: ResolverTypeWrapper<any>
	Country: ResolverTypeWrapper<any>
	ProductPackage: ResolverTypeWrapper<any>
	ProductAddon: ResolverTypeWrapper<any>
	Publication: ResolverTypeWrapper<any>
	Role: ResolverTypeWrapper<any>
	CategoryField: ResolverTypeWrapper<any>
	Phone: ResolverTypeWrapper<any>
	Email: ResolverTypeWrapper<any>
	URL: ResolverTypeWrapper<any>
	ResponseCodeEnum: ResolverTypeWrapper<any>
	MutationResponse: ResolverTypeWrapper<any>
}

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = {
	Query: {}
	String: string
	CursorPaginationParams: any
	Int: any
	NonEmptyString: NonEmptyString
	FrontpageGroupTypeEnum: any
	ListingOrderEnum: any
	Boolean: any
	Listing: any
	Entity: Omit<any, 'id'> & { id: GQLResolversParentTypes['UuidV4'] }
	UuidV4: UuidV4
	User: any
	DateTime: ValidDate
	ListingConnection: any
	PaginatedConnection: any
	PageInfo: any
	ListingEdge: any
	DatedEdge: Omit<any, 'createdAt'> & { createdAt: GQLResolversParentTypes['DateTime'] }
	PagePaginationParams: any
	FavoriteListingConnection: any
	FavoriteListingEdge: any
	GenericSortBy: any
	LabelsConnection: any
	LabelEdge: any
	Label: any
	ReceiptsConnection: any
	ReceiptEdge: any
	Receipt: any
	MessagesConnection: any
	MessageEdge: any
	Message: any
	ListingStatusEnum: any
	Category: any
	Image: any
	ImageSizes: any
	ListingTypeEnum: any
	Location: any
	Country: any
	ProductPackage: any
	ProductAddon: any
	Publication: any
	Role: any
	CategoryField: any
	Phone: any
	Email: any
	URL: any
	ResponseCodeEnum: any
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
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	slug: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	parents: Resolver<Maybe<ReadonlyArray<GQLResolversTypes['Category']>>, ParentType, ContextType>
	children: Resolver<Maybe<ReadonlyArray<GQLResolversTypes['Category']>>, ParentType, ContextType>
	isLeaf: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>
	isCars: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>
	isPersonal: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>
	nemIdRequired: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>
	listingConnection: Resolver<
		Maybe<GQLResolversTypes['ListingConnection']>,
		ParentType,
		ContextType,
		RequireFields<GQLCategoryListingConnectionArgs, 'sortBy' | 'reverse'>
	>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	updatedAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLCategoryFieldResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['CategoryField'] = GQLResolversParentTypes['CategoryField']
> = {
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	value: Resolver<Maybe<ReadonlyArray<GQLResolversTypes['NonEmptyString']>>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLCountryResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Country'] = GQLResolversParentTypes['Country']
> = {
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	code: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	callingCode: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	callingCodeValidationRegex: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	updatedAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLDatedEdgeResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['DatedEdge'] = GQLResolversParentTypes['DatedEdge']
> = {
	__resolveType: TypeResolveFn<
		'ListingEdge' | 'FavoriteListingEdge' | 'LabelEdge' | 'ReceiptEdge' | 'MessageEdge',
		ParentType,
		ContextType
	>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
}

export interface GQLDateTimeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['DateTime'], any> {
	name: 'DateTime'
}

export interface GQLEmailScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['Email'], any> {
	name: 'Email'
}

export type GQLEntityResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Entity'] = GQLResolversParentTypes['Entity']
> = {
	__resolveType: TypeResolveFn<
		| 'Listing'
		| 'User'
		| 'Label'
		| 'Receipt'
		| 'Message'
		| 'Category'
		| 'Country'
		| 'ProductPackage'
		| 'ProductAddon'
		| 'Publication'
		| 'CategoryField'
		| 'Phone',
		ParentType,
		ContextType
	>
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
}

export type GQLFavoriteListingConnectionResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['FavoriteListingConnection'] = GQLResolversParentTypes['FavoriteListingConnection']
> = {
	edges: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['FavoriteListingEdge']>>>, ParentType, ContextType>
	nodes: Resolver<Maybe<ReadonlyArray<GQLResolversTypes['Listing']>>, ParentType, ContextType>
	pageInfo: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>
	totalCount: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLFavoriteListingEdgeResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['FavoriteListingEdge'] = GQLResolversParentTypes['FavoriteListingEdge']
> = {
	node: Resolver<Maybe<GQLResolversTypes['Listing']>, ParentType, ContextType>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLImageResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Image'] = GQLResolversParentTypes['Image']
> = {
	url: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType, RequireFields<GQLImageUrlArgs, 'size'>>
	size: Resolver<GQLResolversTypes['ImageSizes'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLLabelResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Label'] = GQLResolversParentTypes['Label']
> = {
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLLabelEdgeResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['LabelEdge'] = GQLResolversParentTypes['LabelEdge']
> = {
	node: Resolver<Maybe<GQLResolversTypes['Label']>, ParentType, ContextType>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLLabelsConnectionResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['LabelsConnection'] = GQLResolversParentTypes['LabelsConnection']
> = {
	edges: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['LabelEdge']>>>, ParentType, ContextType>
	nodes: Resolver<Maybe<ReadonlyArray<GQLResolversTypes['Label']>>, ParentType, ContextType>
	pageInfo: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>
	totalCount: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLListingResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Listing'] = GQLResolversParentTypes['Listing']
> = {
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
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
	primaryImage: Resolver<Maybe<GQLResolversTypes['Image']>, ParentType, ContextType>
	images: Resolver<Maybe<ReadonlyArray<GQLResolversTypes['Image']>>, ParentType, ContextType>
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
	nodes: Resolver<Maybe<ReadonlyArray<GQLResolversTypes['Listing']>>, ParentType, ContextType>
	pageInfo: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>
	totalCount: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLListingEdgeResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['ListingEdge'] = GQLResolversParentTypes['ListingEdge']
> = {
	node: Resolver<Maybe<GQLResolversTypes['Listing']>, ParentType, ContextType>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLLocationResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Location'] = GQLResolversParentTypes['Location']
> = {
	address: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	zipCode: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	city: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	country: Resolver<GQLResolversTypes['Country'], ParentType, ContextType>
	lat: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	long: Resolver<Maybe<GQLResolversTypes['NonEmptyString']>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLMessageResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Message'] = GQLResolversParentTypes['Message']
> = {
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLMessageEdgeResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['MessageEdge'] = GQLResolversParentTypes['MessageEdge']
> = {
	node: Resolver<Maybe<GQLResolversTypes['Message']>, ParentType, ContextType>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLMessagesConnectionResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['MessagesConnection'] = GQLResolversParentTypes['MessagesConnection']
> = {
	edges: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['MessageEdge']>>>, ParentType, ContextType>
	nodes: Resolver<Maybe<ReadonlyArray<GQLResolversTypes['Message']>>, ParentType, ContextType>
	pageInfo: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>
	totalCount: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLMutationResponseResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['MutationResponse'] = GQLResolversParentTypes['MutationResponse']
> = {
	__resolveType: TypeResolveFn<null, ParentType, ContextType>
	code: Resolver<GQLResolversTypes['ResponseCodeEnum'], ParentType, ContextType>
	success: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>
	data: Resolver<GQLResolversTypes['Entity'], ParentType, ContextType>
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
	__resolveType: TypeResolveFn<
		| 'ListingConnection'
		| 'FavoriteListingConnection'
		| 'LabelsConnection'
		| 'ReceiptsConnection'
		| 'MessagesConnection',
		ParentType,
		ContextType
	>
	pageInfo: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>
	totalCount: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>
}

export type GQLPhoneResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Phone'] = GQLResolversParentTypes['Phone']
> = {
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
	country: Resolver<GQLResolversTypes['Country'], ParentType, ContextType>
	value: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	updatedAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLProductAddonResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['ProductAddon'] = GQLResolversParentTypes['ProductAddon']
> = {
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
	sku: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLProductPackageResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['ProductPackage'] = GQLResolversParentTypes['ProductPackage']
> = {
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
	sku: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	name: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	addons: Resolver<Maybe<ReadonlyArray<GQLResolversTypes['ProductAddon']>>, ParentType, ContextType>
	publications: Resolver<Maybe<ReadonlyArray<GQLResolversTypes['Publication']>>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLPublicationResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Publication'] = GQLResolversParentTypes['Publication']
> = {
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
	sku: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
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
		RequireFields<GQLQueryFrontPageListingsArgs, 'ofGroup' | 'sortBy' | 'reverse'>
	>
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
	user: Resolver<Maybe<GQLResolversTypes['User']>, ParentType, ContextType, RequireFields<GQLQueryUserArgs, 'id'>>
}

export type GQLReceiptResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['Receipt'] = GQLResolversParentTypes['Receipt']
> = {
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
	price: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>
	slug: Resolver<GQLResolversTypes['NonEmptyString'], ParentType, ContextType>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLReceiptEdgeResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['ReceiptEdge'] = GQLResolversParentTypes['ReceiptEdge']
> = {
	node: Resolver<Maybe<GQLResolversTypes['Receipt']>, ParentType, ContextType>
	createdAt: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type GQLReceiptsConnectionResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['ReceiptsConnection'] = GQLResolversParentTypes['ReceiptsConnection']
> = {
	edges: Resolver<Maybe<ReadonlyArray<Maybe<GQLResolversTypes['ReceiptEdge']>>>, ParentType, ContextType>
	nodes: Resolver<Maybe<ReadonlyArray<GQLResolversTypes['Receipt']>>, ParentType, ContextType>
	pageInfo: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>
	totalCount: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export interface GQLUrlScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['URL'], any> {
	name: 'URL'
}

export type GQLUserResolvers<
	ContextType = Context,
	ParentType extends GQLResolversParentTypes['User'] = GQLResolversParentTypes['User']
> = {
	id: Resolver<GQLResolversTypes['UuidV4'], ParentType, ContextType>
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
	labelsConnection: Resolver<
		Maybe<GQLResolversTypes['LabelsConnection']>,
		ParentType,
		ContextType,
		RequireFields<GQLUserLabelsConnectionArgs, 'sortBy' | 'reverse'>
	>
	receiptsConnection: Resolver<
		Maybe<GQLResolversTypes['ReceiptsConnection']>,
		ParentType,
		ContextType,
		RequireFields<GQLUserReceiptsConnectionArgs, 'sortBy' | 'reverse'>
	>
	messagesConnection: Resolver<
		Maybe<GQLResolversTypes['MessagesConnection']>,
		ParentType,
		ContextType,
		RequireFields<GQLUserMessagesConnectionArgs, 'sortBy' | 'reverse'>
	>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}

export interface GQLUuidV4ScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['UuidV4'], any> {
	name: 'UuidV4'
}

export type GQLResolvers<ContextType = Context> = {
	Category: GQLCategoryResolvers<ContextType>
	CategoryField: GQLCategoryFieldResolvers<ContextType>
	Country: GQLCountryResolvers<ContextType>
	DatedEdge: GQLDatedEdgeResolvers
	DateTime: GraphQLScalarType
	Email: GraphQLScalarType
	Entity: GQLEntityResolvers
	FavoriteListingConnection: GQLFavoriteListingConnectionResolvers<ContextType>
	FavoriteListingEdge: GQLFavoriteListingEdgeResolvers<ContextType>
	Image: GQLImageResolvers<ContextType>
	Label: GQLLabelResolvers<ContextType>
	LabelEdge: GQLLabelEdgeResolvers<ContextType>
	LabelsConnection: GQLLabelsConnectionResolvers<ContextType>
	Listing: GQLListingResolvers<ContextType>
	ListingConnection: GQLListingConnectionResolvers<ContextType>
	ListingEdge: GQLListingEdgeResolvers<ContextType>
	Location: GQLLocationResolvers<ContextType>
	Message: GQLMessageResolvers<ContextType>
	MessageEdge: GQLMessageEdgeResolvers<ContextType>
	MessagesConnection: GQLMessagesConnectionResolvers<ContextType>
	MutationResponse: GQLMutationResponseResolvers
	NonEmptyString: GraphQLScalarType
	PageInfo: GQLPageInfoResolvers<ContextType>
	PaginatedConnection: GQLPaginatedConnectionResolvers
	Phone: GQLPhoneResolvers<ContextType>
	ProductAddon: GQLProductAddonResolvers<ContextType>
	ProductPackage: GQLProductPackageResolvers<ContextType>
	Publication: GQLPublicationResolvers<ContextType>
	Query: GQLQueryResolvers<ContextType>
	Receipt: GQLReceiptResolvers<ContextType>
	ReceiptEdge: GQLReceiptEdgeResolvers<ContextType>
	ReceiptsConnection: GQLReceiptsConnectionResolvers<ContextType>
	URL: GraphQLScalarType
	User: GQLUserResolvers<ContextType>
	UuidV4: GraphQLScalarType
}

export type GQLDirectiveResolvers<ContextType = Context> = {
	auth: GQLAuthDirectiveResolver<any, any, ContextType>
}
