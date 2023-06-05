export interface IAuthState {
    isAuthenticated: boolean;
    msg: string,
    authState: AuthState
}

export type AuthState = {
    user?: JWTPayload
    error?: string
}
export type JWTPayload = {
    user_id: number
    username: string
    role: string
}