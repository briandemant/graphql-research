import gql from 'graphql-tag'

export const UserListQuery = gql`
	query users {
		users {
			...UserListFields
		}
	}

	fragment UserListFields on User {
		id
		name
	}
`
