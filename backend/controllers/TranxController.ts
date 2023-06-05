import { TranxService } from "../services/TranxService"; 
import { Request, Response } from "express";


export class TranxController{
    private readonly tag = "TranxController";

    constructor(private tranxService: TranxService){
        this.tranxService = tranxService;
    };

    upload = async (req: Request, resp: Response) => {
        try {
            var data = req.body.data
            data = data.filter((tranx: any) => tranx['Date(UTC)'] != "")
            data = data.map((tranx: any) => {
                return {
                    side: tranx.Side,
                    pair: tranx.Pair.replace('USDT', '-USD'),
                    executedPrice: Number(tranx.Price.replace(/[^\d.-]/g, '').replace(',', '')),
                    executed: Number(tranx.Executed.replace(/[^\d.-]/g, '').replace(',', '')),
                    amount: Number(tranx.Amount.replace(/[^\d.-]/g, '').replace(',', '')),
                    fee: Number(tranx.Fee.replace(/[^\d.-]/g, '').replace(',', '')),
                    ts_unix: (new Date(tranx['Date(UTC)']).getTime()/1000),
                    ts_string: tranx['Date(UTC)']
                }
            })
            console.log("upload route recived data: ", data.length)
            this.tranxService.upload(data, req.user!.id);
            resp.status(200).json({ msg: "OK" })
        } catch (err) {
            console.log(err)
            resp.status(500).json({ msg: "Internal Server Error" })
        }
    };

    getTranx = async (req: Request, resp: Response) => {
        try { 
            const result = await this.tranxService.getTranx(req.user!.id);
            resp.json({ data: result });
            console.log("get_tranx route found data: ", result.length)
            return 
        } catch (err) {
            console.log(err)
            resp.status(500).json({ msg: "Internal Server Error" })
        }
    };
}