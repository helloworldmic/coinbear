import { CoinPriceState } from './state'

// export function loadCoinPriceAction(ticker: string, previousPrice: number, currentPrice: number, amount: number) {
//     return {
//         type: '@@loadCoinPrice' as const,
//         ticker,
//         previousPrice,
//         currentPrice,
//         amount,
//     }
// }
export function gotPortfolio(data: any) {
    return {
        type: '@@gotPortfolio' as const,
        data
    }

} 

export function loadCoinPriceAction(pair: string, boughtPrice: number, currentPrice: number, executed: number, amount: number) {
    return {

        type: '@@loadCoinPrice' as const,
        pair, 
        boughtPrice,
        currentPrice,
        executed, //number of coins bought
        amount, //number of USD used to buy the coin

    }
}



export type CoinPriceAction = 
| ReturnType<typeof loadCoinPriceAction>
| ReturnType<typeof gotPortfolio>

