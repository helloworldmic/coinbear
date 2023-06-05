
export function loadPriceAction(latestPrice: any) {
    return {
        type: '@@loadPrice' as const,
        latestPrice,
        
    }
}



export type PriceAction = | ReturnType<typeof loadPriceAction>