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
	/**
	 * scalar NonEmptyString
	 * scalar Slug
	 */
	UuidV4: string
	DateTime: Date
	ListingXXX: any
	UserXXX: any
}

export type Query = {
	readonly echoUuid: Maybe<Scalars['UuidV4']>
	readonly isFuture: Maybe<Scalars['Boolean']>
	readonly isPast: Maybe<Scalars['Boolean']>
	readonly now: Maybe<Scalars['DateTime']>
	readonly uuid: Maybe<Scalars['UuidV4']>
	readonly validUuid: Maybe<Scalars['Boolean']>
	readonly welcome: Scalars['String']
}

export type QueryEchoUuidArgs = {
	id: Maybe<Scalars['UuidV4']>
}

export type QueryIsFutureArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type QueryIsPastArgs = {
	date: Maybe<Scalars['DateTime']>
}

export type QueryValidUuidArgs = {
	id: Maybe<Scalars['String']>
}

export type QueryWelcomeArgs = {
	name: Maybe<Scalars['String']>
}
