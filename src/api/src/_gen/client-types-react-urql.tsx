/* eslint-disable */
import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	TrimmedNonEmptyString: any
	DateTime: any
}

export enum Pong {
	Pong = 'PONG',
}

export type Query = {
	readonly ping?: Maybe<Pong>
	readonly user?: Maybe<User>
	readonly users: ReadonlyArray<User>
}

export type QueryUserArgs = {
	id: Scalars['ID']
}

export type User = {
	readonly id: Scalars['ID']
	readonly name: Scalars['TrimmedNonEmptyString']
}

export type UserQueryVariables = {
	id: Scalars['ID']
}

export type UserQuery = { readonly user: Maybe<UserDetailFieldsFragment> }

export type UserDetailFieldsFragment = Pick<User, 'id' | 'name'>

export type UsersQueryVariables = {}

export type UsersQuery = { readonly users: ReadonlyArray<UserListFieldsFragment> }

export type UserListFieldsFragment = Pick<User, 'id' | 'name'>

export const UserDetailFieldsFragmentDoc = gql`
	fragment UserDetailFields on User {
		id
		name
	}
`
export const UserListFieldsFragmentDoc = gql`
	fragment UserListFields on User {
		id
		name
	}
`
export const UserDocument = gql`
	query user($id: ID!) {
		user(id: $id) {
			...UserDetailFields
		}
	}
	${UserDetailFieldsFragmentDoc}
`

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
	return Urql.useQuery<UserQuery>({ query: UserDocument, ...options })
}
export const UsersDocument = gql`
	query users {
		users {
			...UserListFields
		}
	}
	${UserListFieldsFragmentDoc}
`

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
	return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options })
}
