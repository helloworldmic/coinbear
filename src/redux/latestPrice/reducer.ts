import { PriceAction } from './action'
import { PriceState } from './state'


const initialState: PriceState = {
    latestPrice: {},
    
}


export const priceReducer = (state: PriceState = initialState, action: PriceAction): PriceState => {

    switch (action.type) {
        case '@@loadPrice':
            state.latestPrice = action.latestPrice
     

            // const profit = (state.boughtPrice - state.boughtPrice) * state.amount
            // console.log(profit)
            return {
                ...state,
                latestPrice: action.latestPrice,
            };
    }

    return state
}
