export interface CoinPrice {   // ---> changed to loadCoinPriceAction
    ticker: string
    previousPrice: number
    currentPrice: number
}

export interface Transaction {
    type: 'buy' | 'sell'
    price: number
    ticker: string
    amount: number
    date: Date
}


export interface DashboardState {
    coinPrices: CoinPrice[] // <-- BTC ETH DOG
    transactions: Transaction[]
}

{
    type: "buy",
        price: 100,
            ticker: "BTC",
                amount: 100,
                    date: new Date("2021-12-21")
}

{

    type: "sell",
        price: 120,
            ticker: "BTC",
                amount: 100,
                    date: new Date("2021-12-22");
}
