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

export type FavoriteListingConnction = {
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
}

/** EXTRA DATA v2 */
export type ListingConnction = {
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
}

export type ListingFavorite = {
	readonly listing: Listing
	readonly user: User
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
export enum ListingOrderEnum {
	CreatedAt = 'CREATED_AT',
	UpdatedAt = 'UPDATED_AT',
}

export type PageInfo = {
	/** Indicates if there are more pages to fetch */
	readonly hasNextPage: Scalars['Boolean']
	/** Indicates if there are any pages prior to the current page */
	readonly hasPreviousPage: Scalars['Boolean']
	/** When paginating backwards, the cursor to continue */
	readonly startCursor: Maybe<Scalars['String']>
	/** When paginating forwards, the cursor to continue */
	readonly endCursor: Maybe<Scalars['String']>
}

export type PagePaginationParams = {
	readonly limit: Maybe<Scalars['Int']>
	readonly page: Maybe<Scalars['Int']>
}

export type Query = {
	readonly isFuture: Maybe<Scalars['Boolean']>
	readonly isPast: Maybe<Scalars['Boolean']>
	readonly listing: Maybe<Listing>
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

export type SortParams = {
	readonly orderBy: Maybe<Scalars['String']>
	readonly reverse: Maybe<Scalars['Boolean']>
}

export type User = {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly listings: ReadonlyArray<Listing>
	readonly listingConnection: ListingConnction
	/** listingList: ListingList! */
	readonly luckyNumber: Maybe<Scalars['Int']>
}

export type UserListingConnectionArgs = {
	term: Maybe<Scalars['String']>
	pageignation: Maybe<PagePaginationParams>
	sortBy: Maybe<ListingOrderEnum>
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
