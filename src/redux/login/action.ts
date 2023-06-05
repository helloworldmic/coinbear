import LoginState from './state'

export function loadLoginAction(
    userName: string,
    email: string,
    password: string) {

    return {
        type: "@@login" as const,
        userName,
        email,
        password,
    }
}
export type LoginAction = | ReturnType<typeof loadLoginAction>

//future: add type : deactivate account 