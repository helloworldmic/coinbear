import { PriceService } from "../services/PriceService";
import { Request, Response } from "express";


export class PriceController {
    private readonly tag = "PriceController";

    constructor(private priceService: PriceService) { };

    getPrice = async (req: Request, resp: Response) => {
        try {
            const interval = req.body.interval
            const pair = req.body.pair
            const result = await this.priceService.getPrice(pair, interval)
            // console.log(req.body, result)
            resp.json({ data: result });
        } catch (err) {
            console.log(err)
            resp.status(500).json({ msg: "Internal Server Error" })
        }
    };

    getCurrentPrice = async (req: Request, resp: Response) => {
        try {
            const pair = req.query.pair
            if (!pair) {
                resp.status(404).json({ error: 'pair not found' });
                return;
            }
            if (typeof pair !== "string") {
                resp.status(500).json({ error: 'Invalid pair' });
                return;
            }
            const result = await this.priceService.getCurrentPrice(pair)
            resp.json({ data: result });
        } catch (err) {
            console.log(err)
            resp.status(500).json({ msg: "Internal Server Error" })
        }
    }
}