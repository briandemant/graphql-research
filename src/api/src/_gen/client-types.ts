/* eslint-disable */
// PLEASE DO NOT EDIT !!

export type Maybe<T> = T | null

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	NonEmptyString: string
	/** scalar Slug */
	UuidV4: string
	DateTime: Date
	/** scalar Md5 */
	SimpleID: any
	Email: any
	URL: any
}

export type Category = Entity & {
	readonly id: Scalars['UuidV4']
	readonly name: Scalars['NonEmptyString']
	readonly slug: Scalars['NonEmptyString']
	readonly createdAt: Scalars['DateTime']
}

/**
 * TODO: Basic implementation, for now.
 * Needs to be refactored, to support different types of values, etc.
 */
export type CategoryField = Entity & {
	readonly id: Scalars['UuidV4']
	readonly name: Scalars['NonEmptyString']
	readonly value: Maybe<ReadonlyArray<Scalars['NonEmptyString']>>
}

export type CursorPaginationParams = {
	readonly limit: Maybe<Scalars['Int']>
	readonly after: Maybe<Scalars['NonEmptyString']>
	readonly before: Maybe<Scalars['NonEmptyString']>
}

/**
 * For Edges that have a timestamp,
 * documenting the time of the connection
 */
export type DatedEdge = {
	readonly createdAt: Scalars['DateTime']
}

/** ## Interfaces */
export type Entity = {
	readonly id: Scalars['UuidV4']
}

/** "Saved-Search of listings" owned by User, paginated */
export type FavoriteListingConnection = PaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<FavoriteListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Listing>>
	/** Information to aid in pagination. */
	readonly pageInfo: PageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/** Connection details between a "Saved-Search of listings" and a User */
export type FavoriteListingEdge = DatedEdge & {
	readonly node: Maybe<Listing>
	readonly createdAt: Scalars['DateTime']
}

export type Image = {
	/** Absolute URL for accessing an image */
	readonly url: Scalars['NonEmptyString']
	readonly size: ImageSizes
}

export type ImageUrlArgs = {
	size?: Maybe<ImageSizes>
}

export enum ImageSizes {
	Thumb = 'THUMB',
	Small = 'SMALL',
	Medium = 'MEDIUM',
	Large = 'LARGE',
}

export type Listing = Entity & {
	/** basic */
	readonly id: Scalars['UuidV4']
	readonly slug: Scalars['NonEmptyString']
	readonly owner: User
	readonly online: Scalars['Boolean']
	readonly status: ListingStatusEnum
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
	readonly category: Category
	readonly primaryImage: Maybe<Image>
	readonly images: Maybe<ReadonlyArray<Image>>
	/** misc */
	readonly type: ListingTypeEnum
	/** Bizz user only */
	readonly homepage: Maybe<Scalars['NonEmptyString']>
	/** contact - (might be inherited from owner or listing specific) */
	readonly phone: Maybe<Scalars['NonEmptyString']>
	/** location - (might be inherited from owner or defined for the listing specifically) */
	readonly location: Location
	/** Product - package, addons, publications */
	readonly productPackage: ProductPackage
}

/** Listings owned by User, paginated */
export type ListingConnection = PaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<ListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Listing>>
	/** Information to aid in pagination. */
	readonly pageInfo: PageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/** Connection details between a Listings and a User */
export type ListingEdge = DatedEdge & {
	readonly node: Maybe<Listing>
	readonly createdAt: Scalars['DateTime']
}

export enum ListingOrderEnum {
	CreatedAt = 'CREATED_AT',
	UpdatedAt = 'UPDATED_AT',
	Random = 'RANDOM',
}

export enum ListingStatusEnum {
	Active = 'ACTIVE',
	Inactive = 'INACTIVE',
	Expired = 'EXPIRED',
	Draft = 'DRAFT',
}

export enum ListingTypeEnum {
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
export type Location = {
	readonly address: Maybe<Scalars['NonEmptyString']>
	readonly zipCode: Maybe<Scalars['NonEmptyString']>
	readonly city: Maybe<Scalars['NonEmptyString']>
	readonly country: Maybe<Scalars['NonEmptyString']>
	readonly lat: Maybe<Scalars['NonEmptyString']>
	readonly long: Maybe<Scalars['NonEmptyString']>
}

export type MutationResponse = {
	readonly code: ResponseCodeEnum
	readonly success: Scalars['Boolean']
	readonly data: Entity
}

/** Generic pagination info */
export type PageInfo = {
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

export type PagePaginationParams = {
	readonly limit: Maybe<Scalars['Int']>
	readonly page: Maybe<Scalars['Int']>
}

export type PaginatedConnection = {
	/** Information to aid in pagination. */
	readonly pageInfo: PageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

/** Addons, for granular tweaking of the exposure rules/features. */
export type ProductAddon = Entity & {
	readonly id: Scalars['UuidV4']
	readonly sku: Scalars['NonEmptyString']
	readonly name: Scalars['NonEmptyString']
}

/** A product package defines the general exposure rules/features of the Listing. */
export type ProductPackage = Entity & {
	readonly id: Scalars['UuidV4']
	readonly sku: Scalars['NonEmptyString']
	readonly name: Scalars['NonEmptyString']
	readonly addons: Maybe<ReadonlyArray<ProductAddon>>
	readonly publications: Maybe<ReadonlyArray<ProductPackage>>
}

/**
 * Offline exposure (print) of the Listing.
 * Which publication/newspaper will the Listing appear in.
 */
export type Publication = Entity & {
	readonly id: Scalars['UuidV4']
	readonly sku: Scalars['NonEmptyString']
	readonly name: Scalars['NonEmptyString']
	readonly from: Scalars['DateTime']
	readonly to: Scalars['DateTime']
}

/** this is just to be able to return something in this separate schema file */
export type Query = {
	readonly apiVersion: Scalars['String']
	readonly frontPageListings: ReadonlyArray<Listing>
	readonly isFuture: Maybe<Scalars['Boolean']>
	readonly isPast: Maybe<Scalars['Boolean']>
	readonly listing: Maybe<Listing>
	readonly listings: ReadonlyArray<Listing>
	readonly now: Maybe<Scalars['DateTime']>
	readonly user: Maybe<User>
	readonly utils: Maybe<Util>
	readonly welcome: Scalars['String']
}

/** this is just to be able to return something in this separate schema file */
export type QueryFrontPageListingsArgs = {
	cursor: Maybe<CursorPaginationParams>
	sortBy?: Maybe<ListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

/** this is just to be able to return something in this separate schema file */
export type QueryIsFutureArgs = {
	date: Maybe<Scalars['DateTime']>
}

/** this is just to be able to return something in this separate schema file */
export type QueryIsPastArgs = {
	date: Maybe<Scalars['DateTime']>
}

/** this is just to be able to return something in this separate schema file */
export type QueryListingArgs = {
	id: Scalars['UuidV4']
}

/** this is just to be able to return something in this separate schema file */
export type QueryListingsArgs = {
	cursor: Maybe<CursorPaginationParams>
	sortBy?: Maybe<ListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

/** this is just to be able to return something in this separate schema file */
export type QueryUserArgs = {
	id: Scalars['UuidV4']
}

/** this is just to be able to return something in this separate schema file */
export type QueryWelcomeArgs = {
	name: Maybe<Scalars['String']>
}

/** Bare minium mutation response */
export enum ResponseCodeEnum {
	Ok = 'OK',
	NotFound = 'NOT_FOUND',
	Error = 'ERROR',
}

export enum Role {
	Admin = 'ADMIN',
	User = 'USER',
}

export type User = Entity & {
	readonly id: Scalars['UuidV4']
	readonly name: Maybe<Scalars['NonEmptyString']>
	readonly email: Maybe<Scalars['NonEmptyString']>
	readonly userName: Maybe<Scalars['NonEmptyString']>
	readonly createdAt: Scalars['DateTime']
	/** Cursor pagination */
	readonly listingConnection: Maybe<ListingConnection>
	/** Generic pagination */
	readonly favoriteListingsConnection: Maybe<FavoriteListingConnection>
}

export type UserListingConnectionArgs = {
	cursor: Maybe<CursorPaginationParams>
	sortBy?: Maybe<ListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

export type UserFavoriteListingsConnectionArgs = {
	pagination: Maybe<PagePaginationParams>
	sortBy?: Maybe<ListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

export type Util = {
	readonly uuid: Maybe<Scalars['UuidV4']>
	readonly validUuid: Maybe<Scalars['Boolean']>
	readonly echoUuid: Maybe<Scalars['UuidV4']>
	readonly newField: Maybe<Scalars['String']>
	readonly oldField: Maybe<Scalars['String']>
}

export type UtilValidUuidArgs = {
	idOrNot: Scalars['String']
}

export type UtilEchoUuidArgs = {
	id: Scalars['UuidV4']
}
