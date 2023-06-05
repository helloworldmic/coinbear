import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("portfolio").del();
    // Inserts a portfolio for adamsbaker
    const userID = await knex
        .select('id')
        .from('user')
        .where('user.username', '=', 'adamsbaker')
    console.log(userID)

    const transaction = await knex
        .select("userID",
        "side",
        "pair",
        "executedPrice",
        "executed",
        "amount",
        "fee",
        "unixTimestamp",
        "datetime")
        .from('transaction')
        .where('userID', '=', userID[0].id)

    let BTCQuantity = 0
    let ETHQuantity = 0
    let SANDQuantity = 0
    let USDQuantity = 0

    for (let i = 0; i < transaction.length; i++) {
        let signedExecuted
        if (transaction[i].side == 'sell') {
            signedExecuted = -transaction[i].executed
        } else if (transaction[i].side == 'buy') {
            signedExecuted = transaction[i].executed
        } else {
            let b = 3
        }

        console.log(signedExecuted)
        if (transaction[i].pair == "BTC-USD") {
            BTCQuantity += signedExecuted
            console.log(BTCQuantity)
        } else if (transaction[i].pair == "ETH-USD") {
            ETHQuantity += signedExecuted
            console.log(ETHQuantity)
        } else if (transaction[i].pair == "SAND-USD") {
            SANDQuantity += signedExecuted
            console.log(SANDQuantity)
        } else if (transaction[i].pair == "USD-USD") {
            USDQuantity += signedExecuted
            console.log(USDQuantity)
        } else {
            let a = 3 
        }    
    }
    
    // Inserts seed entries
    await knex("portfolio").insert([
        { 
            userID: userID[0].id,
            pair: "BTC-USD",
            quantity: BTCQuantity
        },
        { 
            userID: userID[0].id,
            pair: "ETH-USD",
            quantity: ETHQuantity
        },
        { 
            userID: userID[0].id,
            pair: "SAND-USD",
            quantity: SANDQuantity
        },
        { 
            userID: userID[0].id,
            pair: "USD-USD",
            quantity: USDQuantity
        },
    ]).returning('id');
};
