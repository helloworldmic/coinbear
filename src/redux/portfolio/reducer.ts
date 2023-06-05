import { CoinPriceAction } from './action'
import { CoinPriceState } from './state'


const initialState: CoinPriceState = {
    pair: '', 
    boughtPrice: 0,
    currentPrice: 0,
    executed: 0, //number of coins bought
    amount: 0, 
}


export const coinPriceReducer = (state: CoinPriceState = initialState, action: CoinPriceAction): CoinPriceState => {

    switch (action.type) {
        case '@@gotPortfolio':
            console.log(action.data)
            return {
                ...state
            }
        case '@@loadCoinPrice':
            state.pair = action.pair
            state.boughtPrice = action.boughtPrice
            state.currentPrice = action.currentPrice
            state.executed = action.executed
            state.amount = action.amount

            const profit = (state.currentPrice - state.boughtPrice) * state.amount
            console.log(profit)
            return {
                ...state,
                pair: action.pair,
                boughtPrice: action.boughtPrice,
                currentPrice: action.currentPrice,
                executed: action.executed,
                amount: action.amount
            };
    }

    return state
}
