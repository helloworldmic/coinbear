import { TransactionState } from './state'


export function loadTransactionAction(tranx: Array<any>) {
    return {
        type: '@@loadTransaction' as const,
        tranx,
        
    }
}



export type TransactionAction = | ReturnType<typeof loadTransactionAction>