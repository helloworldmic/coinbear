import { Knex } from "knex";

export class TransactionService {
    constructor(private knex: Knex){
        this.knex = knex;
    }

    async transaction(userID:number, side:string, pair:string, executedPrice:number, executed:number, amount:number, 
        fee:number, unixTimestamp:number, datetime:string) {
    
        const insertNewTrade = await this.knex
        .insert({ userID: userID,
                    side: side, 
                    pair: pair,
                    executedPrice: executedPrice,
                    executed: executed,
                    amount: amount,
                    fee: fee,
                    unixTimestamp: unixTimestamp,
                    datetime: datetime,  
                })
        .into('transaction')
        return insertNewTrade
    }
}