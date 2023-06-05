import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { IDashboardState } from '../redux/store'

import './ChartPie.scss';
export default function PieChart() {
	const tranx = useSelector((state: IDashboardState) => state.transaction.tranx);
	const latestPrice = useSelector((state: IDashboardState) => state.price.latestPrice);
    const [holdings, setHoldings] = useState({} as any);
	const avaliablePair = ['BTC-USD', 'ETH-USD', 'SAND-USD']

	useEffect(() => {
		const avaliableTranx = tranx.filter((singleTranx: any) => avaliablePair.includes(singleTranx.pair))
		console.log(avaliableTranx)
		const holdings = calChat(avaliableTranx, latestPrice)
		setHoldings(holdings)
	}, [latestPrice, tranx]);

	const calChat = (tranx: any, currentPrice: any) => {
		var holdings : { [key: string]: number } = {}
		for (const singleTranx of tranx){
			const side = singleTranx.side;
			const pair = singleTranx.pair;
			const coinType = singleTranx.pair.replace('-USD', '');
			const numberOfCoins = singleTranx.executed;
			if (!(coinType in holdings)){
				holdings[coinType] = 0
			}
			if (side == 'BUY'){
				holdings[coinType] += numberOfCoins * latestPrice[pair]
			}else{
				holdings[coinType] -= numberOfCoins * latestPrice[pair]
			}
		}
		return holdings
	}

	return (
		<div className="chart">
			 <Link to ="portfolio" style={{ color:'#AEAEAE' , textDecoration: 'none' }}> <h3>Your asset allocation</h3></Link>
			<ReactApexChart
				height={350}
				type={"donut"}
				series={Object.values(holdings)}
				options={
					{
						labels: Object.keys(holdings), //'aave', 'fet'
						title: {
							// text: "Your asset allocation",
							align: 'left',
							style: {
								fontSize: "16px",
								color: "#AEAEAE",
							}
						},
						dataLabels: {
							style: {
								fontSize: '16px'
							}
						},
						responsive: [
							{
								// breakpoint: 480, // this makes pie chart disappear when it's on smaller screen
								options: {
									chart: {
										width: 200,
									},
									legend: {
										position: "bottom",
									},
								},
							},
						],
					}
				}
			/>
		</div>

	);
}
