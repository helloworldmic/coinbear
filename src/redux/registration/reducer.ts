import  RegisterState  from './state'
import { RegisterAction } from './action'
const initialState: RegisterState = {
    isValidated: false,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    pair: '',
}
export const registerReducer = (state: RegisterState = initialState, action: RegisterAction): RegisterState => {
    switch (action.type) {
        case '@@register':
            state.isValidated = action.isValidated
            state.firstName = action.firstName
            state.lastName = action.lastName
            state.userName = action.userName
            state.email = action.email
            state.password = action.password
            state.pair = action.pair

            return {
                ...state,
                isValidated: action.isValidated,
                firstName: action.firstName,
                lastName: action.lastName,
                userName: action.userName,
                email: action.email,
                password: action.password,
                pair: action.pair
            }
    }

    return state
}