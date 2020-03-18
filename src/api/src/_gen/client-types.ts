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
	/** scalar Md5 */
	SimpleID: any
	NonEmptyString: string
	DateTime: Date
	/** scalar Slug */
	UuidV4: string
}

export type Category = Entity & {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly slug: Scalars['NonEmptyString']
	readonly createdAt: Scalars['DateTime']
}

export type CategoryField = Entity & {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly value: Maybe<ReadonlyArray<Maybe<Scalars['NonEmptyString']>>>
}

export type CursorPaginationParams = {
	readonly limit: Maybe<Scalars['Int']>
	readonly after: Maybe<Scalars['String']>
	readonly before: Maybe<Scalars['String']>
}

export type DatedEdge = {
	readonly createdAt: Maybe<Scalars['DateTime']>
}

export type Entity = {
	readonly id: Scalars['SimpleID']
}

export type FavoriteListingConnection = PaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<FavoriteListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Maybe<Listing>>>
	/** Information to aid in pagination. */
	readonly pageInfo: PageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

export type FavoriteListingEdge = {
	readonly node: Maybe<Listing>
	readonly createdAt: Maybe<Scalars['DateTime']>
}

export type Image = {
	readonly slug: Scalars['NonEmptyString']
	readonly sizes: ReadonlyArray<Scalars['NonEmptyString']>
}

export type Listing = Entity & {
	/** basic */
	readonly id: Scalars['SimpleID']
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
	readonly vatEnabled: Maybe<Scalars['Boolean']>
	/** relationships */
	readonly category: Category
	readonly images: Maybe<ReadonlyArray<Maybe<Image>>>
	/** misc */
	readonly type: ListingTypeEnum
	readonly homepage: Maybe<Scalars['NonEmptyString']>
	/** contact - might be inherited from owner or listing specific */
	readonly phone: Maybe<Scalars['NonEmptyString']>
	/** location - might be inherited from owner or defined for the listing specifically */
	readonly location: Location
	/** Product - package, addons, publications */
	readonly productPackage: ProductPackage
}

/** supported cursor is the same as order key */
export type ListingConnection = PaginatedConnection & {
	/** A list of edges (same as nodes but with cursor). */
	readonly edges: Maybe<ReadonlyArray<Maybe<ListingEdge>>>
	/** A list of nodes. */
	readonly nodes: Maybe<ReadonlyArray<Maybe<Listing>>>
	/** Information to aid in pagination. */
	readonly pageInfo: PageInfo
	/** Identifies the total count of items in the connection. */
	readonly totalCount: Scalars['Int']
}

export type ListingEdge = {
	readonly node: Maybe<Listing>
	readonly createdAt: Maybe<Scalars['DateTime']>
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
}

export type Location = {
	readonly address: Maybe<Scalars['NonEmptyString']>
	readonly zipCode: Maybe<Scalars['NonEmptyString']>
	readonly city: Maybe<Scalars['NonEmptyString']>
	readonly country: Maybe<Scalars['NonEmptyString']>
	readonly lat: Maybe<Scalars['NonEmptyString']>
	readonly long: Maybe<Scalars['NonEmptyString']>
}

/** Generic pagination info */
export type PageInfo = {
	/**
	 * Indicates if there are more pages to fetch
	 * (contains either page number or cursor)
	 */
	readonly next: Maybe<Scalars['String']>
	/**
	 * Indicates if there are any pages prior to the current page
	 * (contains either page number or cursor)
	 */
	readonly previous: Maybe<Scalars['String']>
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

export type ProductAddon = Entity & {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
}

export type ProductPackage = Entity & {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly addons: Maybe<ReadonlyArray<Maybe<ProductAddon>>>
	readonly publications: Maybe<ReadonlyArray<Maybe<ProductPackage>>>
}

export type Publication = Entity & {
	readonly id: Scalars['SimpleID']
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
	id: Scalars['SimpleID']
}

/** this is just to be able to return something in this separate schema file */
export type QueryListingsArgs = {
	cursor: Maybe<CursorPaginationParams>
	sortBy?: Maybe<ListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

/** this is just to be able to return something in this separate schema file */
export type QueryUserArgs = {
	id: Scalars['SimpleID']
}

/** this is just to be able to return something in this separate schema file */
export type QueryWelcomeArgs = {
	name: Maybe<Scalars['String']>
}

export enum Role {
	Admin = 'ADMIN',
	User = 'USER',
}

export type User = Entity & {
	readonly id: Scalars['SimpleID']
	readonly name: Maybe<Scalars['NonEmptyString']>
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
