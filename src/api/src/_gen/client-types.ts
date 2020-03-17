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
	DateTime: Date
	/** scalar Md5 */
	SimpleID: any
	NonEmptyString: string
	/** scalar Slug */
	UuidV4: string
}

export type Category = {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly slug: Scalars['NonEmptyString']
	readonly createdAt: Scalars['DateTime']
}

export type CategoryFieldsConnection = {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly value: Maybe<ReadonlyArray<Maybe<Scalars['NonEmptyString']>>>
}

export type CursorPaginationParams = {
	readonly size: Maybe<Scalars['Int']>
	readonly after: Maybe<Scalars['String']>
	readonly before: Maybe<Scalars['String']>
}

export type FavoriteListingConnection = {
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

export type Listing = {
	readonly id: Scalars['SimpleID']
	readonly title: Scalars['NonEmptyString']
	readonly slug: Scalars['NonEmptyString']
	readonly owner: User
	readonly category: Category
}

/** supported cursor is the same as order key */
export type ListingConnection = {
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
	readonly size: Maybe<Scalars['Int']>
	readonly page: Maybe<Scalars['Int']>
}

export type Query = {
	readonly apiVersion: Scalars['String']
	readonly isFuture: Maybe<Scalars['Boolean']>
	readonly isPast: Maybe<Scalars['Boolean']>
	readonly listing: Maybe<Listing>
	readonly listings: ReadonlyArray<Listing>
	readonly now: Maybe<Scalars['DateTime']>
	readonly user: Maybe<User>
	readonly utils: Maybe<Util>
	readonly welcome: Scalars['String']
}

export type QueryIsFutureArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type QueryIsPastArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type QueryListingArgs = {
	id: Scalars['SimpleID']
}

export type QueryListingsArgs = {
	cursor: Maybe<CursorPaginationParams>
	sortBy?: Maybe<ListingOrderEnum>
	reverse?: Maybe<Scalars['Boolean']>
}

export type QueryUserArgs = {
	id: Scalars['SimpleID']
}

export type QueryWelcomeArgs = {
	name: Maybe<Scalars['String']>
}

export enum Role {
	Admin = 'ADMIN',
	User = 'USER',
}

export type User = {
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
