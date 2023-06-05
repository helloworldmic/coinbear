import { useEffect, useState } from "react";
import { Dropdown } from 'react-bootstrap'
import ReactApexChart from "react-apexcharts";
import './ChartPie.scss';

interface IData {
    name: string;
    data: number[][]
}

export default function ChartMultiLine() {
    // const [cryptoPrices, setCryptoPrices] = useState<IData[]>([] as any);
    const [cryptoPrices, setCryptoPrices] = useState<IData[]>([] as any);
    const [title, setTitle] = useState("BTC-USD");
    // interface ICandleStickProps {}

    async function getData(pair: string) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ interval: "1d", pair: pair }),
        };
        const resp = await fetch("http://127.0.0.1:8080/api/price", requestOptions);
        const json = await resp.json();
        console.log(json.data);

        const openData: IData = { name: "open", data: [] }
        const closeData: IData = { name: "close", data: [] }
        for (const record of json.data) {
            openData.data.push([new Date(record.ts_unix * 1000), record.open]);
            closeData.data.push([new Date(record.ts_unix * 1000), record.close]);
        }

        setCryptoPrices([openData, closeData]);
        setTitle(pair);
    }

    useEffect(() => {
        getData("BTC-USD");
    }, []);

    const handleSelect = (eventKey: any, event: any) => {
        const pair = event.target.innerHTML;
        console.log("Selected: ");
        getData(pair);
        setTitle(pair);
    };

    return (
        <div className="chart">
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="outline-secondary" size="lg" id="dropdown-basic">
                    {title}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item value="BTC/USDT">BTC-USD</Dropdown.Item>
                    <Dropdown.Item value="ETH/USDT">ETH-USD</Dropdown.Item>
                    <Dropdown.Item value="SAND/USDT">SAND-USD</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <ReactApexChart
                options={{
                    chart: {
                        type: "line",
                        width: "100%"
                    },
                    xaxis: {
                        type: "datetime",
                    },
                    yaxis: {
                        tooltip: {
                            enabled: true,
                        },
                        min: 0,
                        max: 65000
                    },
                }}
                series={cryptoPrices}
                height={550}
            />
        </div>
    );
}

