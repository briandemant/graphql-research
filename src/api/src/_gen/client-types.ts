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

export type Listing = {
	readonly id: Scalars['SimpleID']
	readonly title: Scalars['NonEmptyString']
	/** slug: Slug! */
	readonly owner: User
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

export type User = {
	readonly id: Scalars['SimpleID']
	readonly name: Scalars['NonEmptyString']
	readonly listings: ReadonlyArray<Listing>
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
