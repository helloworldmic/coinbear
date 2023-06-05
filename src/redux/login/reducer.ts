import LoginState from './state'
import { LoginAction } from './action'

const initialState: LoginState = {
    userName: '',
    email: '',
    password: '',
}
export const loginReducer = (state: LoginState = initialState, action: LoginAction): LoginState => {
    switch (action.type) {
        case '@@login':
            state.userName = action.userName
            state.email = action.email
            state.password = action.password

            return {
                ...state,
                userName: action.userName,
                email: action.email,
                password: action.password,
            }
    }

    return state
}