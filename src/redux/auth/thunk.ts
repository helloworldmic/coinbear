import { push } from "connected-react-router";
import { Dispatch } from "react";
import { IRootThunkDispatch } from "../store";
import { IAuthAction, loginFail, loginSuccess, logoutSuccess } from "./action";
const { REACT_APP_API_SERVER } = process.env
export function login(username: string, password: string) {
    return async (dispatch: IRootThunkDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const result = await res.json();

        if (res.status != 200) {
            dispatch(loginFail());
        } else {
            localStorage.setItem('token', result.token);
            dispatch(loginSuccess());
            dispatch(push("/"));
            console.log("store token succeed")
        }
    }
}

export function logout() {
    return async (dispatch: Dispatch<any>) => {
        dispatch(logoutSuccess());
        localStorage.removeItem('token');
        dispatch(push('/'));
    }
}