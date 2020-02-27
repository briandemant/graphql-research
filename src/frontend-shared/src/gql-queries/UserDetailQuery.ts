import gql from 'graphql-tag'

export const UserDetailQuery = gql`
	query user($id: ID!) {
		user(id: $id) {
			...UserDetailFields
		}
	}

	fragment UserDetailFields on User {
		id
		name
	}
`
