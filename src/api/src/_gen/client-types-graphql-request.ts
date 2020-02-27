/* eslint-disable */
import { GraphQLClient } from 'graphql-request'
import { print } from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null

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
export const UsersDocument = gql`
	query users {
		users {
			...UserListFields
		}
	}
	${UserListFieldsFragmentDoc}
`
export function getSdk(client: GraphQLClient) {
	return {
		user(variables: UserQueryVariables): Promise<UserQuery> {
			return client.request<UserQuery>(print(UserDocument), variables)
		},
		users(variables?: UsersQueryVariables): Promise<UsersQuery> {
			return client.request<UsersQuery>(print(UsersDocument), variables)
		},
	}
}
