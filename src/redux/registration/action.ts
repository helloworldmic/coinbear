import  RegisterState  from './state'

export function loadRegisterAction(isValidated: boolean,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    pair: string) {
    return {
        type: "@@register" as const,
        isValidated,
        firstName,
        lastName,
        userName,
        email,
        password,
        pair // pair= coin's name}
    }
}
export type RegisterAction = | ReturnType<typeof loadRegisterAction>

//future: add type : deactivate account 