export interface Context {
	auth: {
		authenticated: boolean
		userId: string
		sessionId: string
	}
}
