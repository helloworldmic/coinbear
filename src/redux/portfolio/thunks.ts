
import { Dispatch } from "redux"
import { gotPortfolio } from "./action"

const { REACT_APP_API_SERVER } = process.env

export function getPortfolio() {
    return async (dispatch: Dispatch) => {
        const url = `${REACT_APP_API_SERVER}/hello`
        console.log(url)
        const result = await fetch(url)
        const data = await result.json()
        dispatch(gotPortfolio(data))
        console.log(data)

    }
}