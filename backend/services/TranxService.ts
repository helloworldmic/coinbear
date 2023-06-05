import { Knex } from "knex";


export class TranxService {
    constructor(private knex: Knex) {
        this.knex = knex;
    }
    async upload(tranxArr: Array<any>, userID: Number) {
        // del old tranx
        await this.knex('transaction')
            .where('transaction.userID', '=', userID)
            .del();

        // insert new tranx
        for (const tranx of tranxArr) {
            await this.knex('transaction').insert({
                userID: userID,
                side: tranx.side,
                pair: tranx.pair,
                executedPrice: tranx.executedPrice,
                executed: tranx.executed,
                amount: tranx.amount,
                fee: tranx.fee,
                unixTimestamp: tranx.ts_unix,
                datetime: tranx.ts_string
            })
        };
    }

    async getTranx(userID: Number) {
        const queryResult = await this.knex
            .select('side', 'pair', 'executedPrice', 'executed', 'amount', 'fee', 'unixTimestamp', 'datetime')
            .where('transaction.userID', '=', userID)
            .from('transaction')
        console.log(queryResult)
        return queryResult;
    }
}