import * as React from "react";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Dropdown } from 'react-bootstrap'
import './ChartPie.scss';

// deleted all things related to options from ChartCandlestick.tsx
export default function CandleStickFn() {
	const [cryptoPrices, setCryptoPrices] = useState<
		{
			x: Date;
			y: number[];
		}[]
	>([] as any);
	const [title, setTitle] = useState("BTC-USD");
	const [interval, setInterval] = useState("1 day");
	// interface ICandleStickProps {}

	async function getData() {
		const intervalMap: { [key: string]: string } = {
			'1 minute': '1m',
			'5 minutes': '5m',
			'1 hour': '1h',
			'1 day': '1d'
		}
		function helper(singleData: any) {
			return {
				x: new Date(singleData.ts_unix * 1000),
				y: [singleData.open, singleData.high,
				singleData.low, singleData.close],
			};
		}
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ interval: intervalMap[interval], pair: title }),
		};
		const resp = await fetch("http://127.0.0.1:8080/api/price", requestOptions);
		var data = await resp.json();
		data = data.data;

		data = data.map(helper);
		if (interval != '1 day'){
			data = data.slice(-2000)
		}
		setCryptoPrices(data);
		console.log('get data')
		console.log(interval, title)
	}
	useEffect(() => {
		getData();
	}, [title, interval]);

	const handleSelectPair = (eventKey: any, event: any) => {
		const pair = event.target.innerHTML;
		setTitle(pair);
	};

	const handleSelectTime = (eventKey: any, event: any) => {
		const interval = event.target.innerHTML;
		setInterval(interval);
	};

	return (
		<div className="chart">
			<Dropdown onSelect={handleSelectPair}>
				<Dropdown.Toggle variant="outline-secondary" size="lg" id="dropdown-basic">
					{title}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item value="BTC-USD">BTC-USD</Dropdown.Item>
					<Dropdown.Item value="ETH-USD">ETH-USD</Dropdown.Item>
					<Dropdown.Item value="SAND-USD">SAND-USD</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			<Dropdown onSelect={handleSelectTime}>
				<Dropdown.Toggle variant="outline-secondary" size="lg" id="dropdown-basic">
					{interval}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item>1 minute</Dropdown.Item>
					<Dropdown.Item>5 minutes</Dropdown.Item>
					<Dropdown.Item>1 hour</Dropdown.Item>
					<Dropdown.Item>1 day</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			<ReactApexChart
				options={{
					// copied all things originally in function getOption()
					chart: {
						type: "candlestick",
						height: 350,
					},
					// title: {
					// 	text: title,
					// 	align: "left",
					// 	style: {
					// 		fontSize: "30px",
					// 	},
					// },
					xaxis: {
						type: "datetime",
						labels:{
							style:{
								colors: '#FEFEFE'
							}
							}
					},
					yaxis: {
						tooltip: {
							enabled: true,
						},
						labels:{
							style:{
								colors: '#FEFEFE'
							}
							}
					},
				}}
				series={[
					{
						data: cryptoPrices.map((data: any) => {
							return {
								x: data.x,
								y: data.y.map((price: any) => price.toFixed(3))
							}
						}),
					},
				]}
				type="candlestick"
				height={350}
			/>
		</div>
	);
}
// function userEffect(arg0: () => Promise<void>) {
//     throw new Error('Function not implemented.');
// }
