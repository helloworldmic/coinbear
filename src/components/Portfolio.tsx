import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import styles from '../App.module.scss'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from "redux";
import { CoinPriceAction, loadCoinPriceAction } from '../redux/portfolio/action';
// import { CoinPriceState } from '../redux/portfolio/state';
import { IDashboardState } from '../redux/store'
import { getPortfolio } from '../redux/portfolio/thunks'
import PieChart from './ChartPie';
import FileInput from './FileInput';
import Transaction from './Transaction';
import AllCoinPrice from './AllCoinPrice'

function Portfolio() {
    const tranx = useSelector((state: IDashboardState) => state.transaction.tranx);
	const latestPrice = useSelector((state: IDashboardState) => state.price.latestPrice);
    const [display, setDisplay] = useState([] as any);

    const avaliablePair = ['BTC-USD', 'ETH-USD', 'SAND-USD'];
    useEffect(() => {
        var units : { [key: string]: number } = {}
        var costs : { [key: string]: number } = {}
        for (const singleTranx of tranx){
            const pair = singleTranx.pair;
            if (!avaliablePair.includes(pair)){
                continue;
            }
            const side = singleTranx.side;
            const boughtPrice = singleTranx.amount;
			const coinType = singleTranx.pair.replace('-USD', '');
			const numberOfCoins = singleTranx.executed;
            if (!(coinType in units)){
				units[coinType] = 0
			}
            if (!(coinType in costs)){
				costs[coinType] = 0
			}
            if (side=='BUY'){
                units[coinType] += numberOfCoins
                costs[coinType] += boughtPrice
            }
            else if (side=='SELL'){
                units[coinType] -= numberOfCoins
                costs[coinType] -= boughtPrice
            }
        }
        let data: { coin: string, cost: number, unit: number, currentPrice: number, amount: number }[] = []
        for (const [key, value] of Object.entries(costs)) {
            data.push(
                {
                    coin: key,
                    cost: value/units[key],
                    unit: units[key],
                    currentPrice: latestPrice[key+'-USD'],
                    amount: value,
                }
            )
        }
        setDisplay(data)
        
    }, [tranx, latestPrice])

    return (
    <div className=''>
        <h4>Your portfolio</h4>
        <Table className={styles.portfolio} striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Coin</th>
                <th>Cost</th>
                <th>Unit</th>
                <th>Current Price</th>
                <th>Amount in USD</th>
                <th>Profit/Lose(%)</th>
                </tr>
            </thead>
            <tbody>
            {display
                .map(((singleDisplay: any) => {
                    return (
                        <tr>
                            <td>{singleDisplay.coin}</td>
                            <td>{singleDisplay.cost}</td>
                            <td>{singleDisplay.unit}</td>
                            <td>{singleDisplay.currentPrice}</td>
                            <td>{singleDisplay.amount}</td>
                            <td>{(((singleDisplay.currentPrice - singleDisplay.cost)/singleDisplay.cost)*100).toFixed(5)}</td>
                        </tr>
                    )
                }))}
            </tbody>
        </Table>
        <PieChart />
        {/* Any other way to do this??? */}
        <div style={{display:'none'}}>
            <Transaction/>
            <AllCoinPrice/>
        </div>

        

    </div>
    

    )
}
export default Portfolio