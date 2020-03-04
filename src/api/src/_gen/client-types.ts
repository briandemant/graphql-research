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
	/**
	 * scalar NonEmptyString
	 * scalar Slug
	 */
	UuidV4: string
	ListingXXX: any
	UserXXX: any
}

export type Query = {
	readonly isFuture: Maybe<Scalars['Boolean']>
	readonly isPast: Maybe<Scalars['Boolean']>
	readonly now: Maybe<Scalars['DateTime']>
	readonly utils: Maybe<Util>
	readonly welcome: Scalars['String']
}

export type QueryIsFutureArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type QueryIsPastArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type QueryWelcomeArgs = {
	name: Maybe<Scalars['String']>
}

export type Util = {
	readonly uuid: Maybe<Scalars['UuidV4']>
	readonly validUuid: Maybe<Scalars['Boolean']>
	readonly echoUuid: Maybe<Scalars['UuidV4']>
}

export type UtilValidUuidArgs = {
	idOrNot: Scalars['String']
}

export type UtilEchoUuidArgs = {
	id: Scalars['UuidV4']
}
