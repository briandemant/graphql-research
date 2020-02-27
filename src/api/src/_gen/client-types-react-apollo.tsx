/* eslint-disable */
import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'
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

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
	return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions)
}
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
	return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions)
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>
export const UsersDocument = gql`
	query users {
		users {
			...UserListFields
		}
	}
	${UserListFieldsFragmentDoc}
`

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
	return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions)
}
export function useUsersLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
	return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions)
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>
