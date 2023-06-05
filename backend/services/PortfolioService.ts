import { Knex } from "knex";

export class PortfolioService {
    constructor(private knex: Knex) {
        this.knex = knex;
    }

    async getPortfolio(userID: number, pair: string) {  // userID: bigint
        const getEntry = this.knex
            .select("quantity")
            .from("portfolio")
            .where({ userID: userID })
            .where({ pair: pair })
        return getEntry
    }

    async getPortfolioByUserID(userID: number) {   //userID: change type fr BigInteger--> bigint
        const getEntry = this.knex
            .select("id", "userID", "pair", "quantity")
            .from("portfolio")
            .where({ userID: userID })
        return getEntry
    }

    async updatePortfolio(userID: number, pair: string, quantity: number) { // userID: bigint
        const updateEntry = this.knex('portfolio')
            .where({ userID: userID })
            .where({ pair: pair })
            .update({
                quantity: quantity,
            })
        return updateEntry
    }
}