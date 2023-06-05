import { IAuthState, AuthState, JWTPayload } from './state';
import { IAuthAction } from './action';
import jwt_decode from "jwt-decode";

const initialState = {
    isAuthenticated: (localStorage.getItem('token') != null),
    msg: "",
    authState: {
        user: undefined,
        error: undefined
    }
}

export function IAuthReducer(state: IAuthState = initialState, action: IAuthAction) {
    switch (action.type) {
        case "@@Auth/LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                msg: ""
            }
        case '@Auth/load_token':
            const result = {
                ...state
            }
            try {
                let payload: JWTPayload = jwt_decode(action.token)
                result.authState.user = payload
                result.authState.error = undefined
                return {
                    ...result,
                }
            } catch (error) {
                result.authState.user = undefined
                result.authState.error = 'invalid JWT Token'
                return {
                    ...result
                }
            }
        case "@@Auth/LOGIN_FAIL":
            return {
                ...state,
                msg: ''//action.msg
            }
        case "@@Auth/LOGOUT_SUCCESS":
            return {
                ...state,
                isAuthenticated: false,
                msg: ""
            }
        default:
            return state;
    }
}