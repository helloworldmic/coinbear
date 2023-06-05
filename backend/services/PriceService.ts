import { Knex } from "knex";


export class PriceService {
    constructor(private knex: Knex) { }

    async getPrice(pair: string, interval: string) {
        const table = `price_${interval}`;
        const queryResult = await this.knex
            .select('ts_unix', 'open', 'close', 'high', 'low', 'vol')
            .from(table)
            .where(`${table}.pair`, '=', pair);
        return queryResult;
    }
    async getCurrentPrice(pair: string) {
        console.log(`pair ${pair}`)
        const queryResult = await this.knex
            .select('ts_unix', 'open', 'close', 'high', 'low', 'vol')
            .from('price_1m')
            .where('pair', '=', pair) //wrong: [price_1m.pair] Error: Undefined binding(s) detected when compiling FIRST. Undefined column(s): [price_1m.pair] query: select "ts_unix", "open", "close", "high", "low", "vol" from "price_1m" where "price_1m"."pair" = ? order by "ts_unix" desc limit ?
            .orderBy([{ column: 'ts_unix', order: 'desc' }])
            .first();
        return queryResult;
    }
}