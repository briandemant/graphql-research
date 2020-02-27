export type Context = {
	auth: {
		authenticated: boolean
		userId: string
		sessionId: string
	}
}
