import { TransactionService } from "../services/TransactionService";
import { UserService } from "../services/UserService";
import { PriceService } from "../services/PriceService"
import { PortfolioService } from "../services/PortfolioService"
import { Request, Response } from "express";
export class TransactionController {
    private readonly tag = "TransactionController";

    constructor(private transactionService: TransactionService,
        private userService: UserService,
        private priceService: PriceService,
        private portfolioService: PortfolioService) {
        this.transactionService = transactionService;
        this.userService = userService;
        this.priceService = priceService;
        this.portfolioService = portfolioService;
    };

    transaction = async (req: Request, resp: Response) => {
        try {
            // parse req.body
            console.log('req.user--->', req.body)
            const userID = req.user!.id // 😖req.session['user'].id  
            const side = req.body.side
            const pair = req.body.pair
            const executedPrice = (await this.priceService.getCurrentPrice(pair)).close
            console.log(executedPrice)
            parseFloat(executedPrice)
            const executed = req.body.executed
            parseFloat(executed)
            const amount = executedPrice * executed
            const fee = req.body.fee
            parseFloat(fee)
            const unixTimestamp = Date.now()
            let datetime = (new Date(unixTimestamp)).toDateString()
            console.log('executedPrice', executedPrice, 'executed', executed)
            // get portfolio and verify sufficient assets
            let portfolio = await this.portfolioService.getPortfolio(userID, pair)
            parseFloat(portfolio[0].quantity)

            if (portfolio.length > 0) { //otherwise, quantity and usdInAccount undefined
                let usdInAccount = await this.portfolioService.getPortfolio(userID, "USD-USD") // usdInAccount= USD-USD
                if ((side === "SELL") && (portfolio[0].quantity < executed)) {
                    resp.json({ msg: "insufficient asset" })
                    return
                }
                if ((side === "BUY") && (usdInAccount[0].quantity < (executed + fee))) {
                    resp.json({ msg: "insufficient fund" })
                    return
                }
                // crypto-currency
                const result = await this.transactionService.transaction(userID, side, pair, executedPrice,
                    executed, amount, fee, unixTimestamp, datetime)
                let cryptoQuantity
                if (side == "BUY") {
                    cryptoQuantity = portfolio[0].quantity + executed
                } else {
                    cryptoQuantity = portfolio[0].quantity - executed
                }
                const updateResult = await this.portfolioService.updatePortfolio(userID, pair, cryptoQuantity)
                // fee and denomination currency: USD
                const fee2 = await this.transactionService.transaction(userID, "SELL", "USD-USD", 1,
                    fee, fee, 0, unixTimestamp, datetime)

                let aux
                if (side === "SELL") {
                    aux = "BUY"
                } else {
                    aux = "SELL"
                }
                const usdAccount = await this.transactionService.transaction(userID, aux, "USD-USD", 1,
                    amount, amount, 0, unixTimestamp, datetime)

                let usdQuantity
                if (side == "BUY") {
                    usdQuantity = usdInAccount[0].quantity - amount - fee
                } else {
                    usdQuantity = usdInAccount[0].quantity + amount - fee
                }
                const updateUSD = await this.portfolioService.updatePortfolio(userID, "USD-USD", usdQuantity)
                resp.json({ msg: "Transaction Successful" });
                return;
            }
            throw new Error("portfolio.length <= 0") //otherwise, isomnia will loop w/o response 
        } catch (err) {
            console.log(err)
            resp.status(500).json({ msg: "Error" })
        }
    };
}