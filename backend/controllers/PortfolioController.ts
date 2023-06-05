import { PortfolioService } from "../services/PortfolioService"
import { PriceService } from "../services/PriceService"
import { Request, Response } from "express";
export class PortfolioController {
    private readonly tag = "PortfolioController";
    constructor(private portfolioService: PortfolioService,
        private priceService: PriceService) {
        this.portfolioService = portfolioService;
        this.priceService = priceService;
    };

    viewPortfolio = async (req: Request, resp: Response) => {
        try {

            // console.log({ "req.user": req.user })
            // only user calls this id, ohter tables call it userID 
            const userID = req.user!.id //changed from req.session['user'].id

            console.log({ userID })
            let portfolio = await this.portfolioService.getPortfolioByUserID(userID)
            console.log(portfolio)
            for (let i = 0; i < portfolio.length; i++) {
                // get ticker from pair
                let str = portfolio[i].pair
                let asset = str.substr(0, (str + "-").indexOf("-"))
                portfolio[i] = Object.assign(portfolio[i], { "asset": asset })
                // get current value of asset in USD
                let currentPrice
                if (portfolio[i].asset == "USD") {
                    currentPrice = 1
                } else {
                    currentPrice = (await this.priceService.getCurrentPrice(portfolio[i].pair)).close
                }
                let value = currentPrice * portfolio[i].quantity
                portfolio[i] = Object.assign(portfolio[i], { "value": value })
            }
            let valueArray = []
            let assetArray = []
            for (let i = 0; i < portfolio.length; i++) {
                valueArray.push(portfolio[i].value)
                assetArray.push(portfolio[i].asset)
            }
            resp.json([valueArray, assetArray]);
        } catch (err) {
            console.log(err)
            resp.status(500).json({ msg: "Error" })
        }
    };
}