import { TransactionAction } from './action'
import { TransactionState } from './state'


const initialState: TransactionState = {
    tranx: [{
        side: 'Unkown',
        pair: 'Unkown',
        executedPrice: 0,
        executed: 0,
        amount: 0,
        fee: 0,
        date: 'Unkown'
    }],
    
}


export const transactionReducer = (state: TransactionState = initialState, action: TransactionAction): TransactionState => {

    switch (action.type) {
        case '@@loadTransaction':
            state.tranx = action.tranx
     

            // const profit = (state.boughtPrice - state.boughtPrice) * state.amount
            // console.log(profit)
            return {
                ...state,
                tranx: action.tranx,
            };
    }

    return state
}
