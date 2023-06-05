//https://www.geeksforgeeks.org/how-to-create-a-cryptocurrency-app-in-reactjs/
import "./AllCoinPrice.module.scss";
import Axios from "axios";
import { useEffect, useState } from "react";
import { loadPriceAction } from "../redux/latestPrice/action";
import { Container, Form, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { IDashboardState } from '../redux/store'
import { Link, useHistory } from "react-router-dom";

function AllCoinPrice() {

    const history = useHistory();

    const latestPrice = useSelector((state: IDashboardState) => state.price.latestPrice);
    const [search, setSearch] = useState("" as any);
    const [crypto, setCrypto] = useState([] as any);
    const pairMap: { [key: string]: any } = {
        'Bitcoin': 'BTC-USD',
        'Ethereum': 'ETH-USD',
        'The Sandbox': 'SAND-USD',
    }
    const availableCoins = ['bitcoin', 'ethereum', 'the-sandbox']
    const avaliablePairs = ['BTC-USD', 'ETH-USD', 'SAND-USD']
    const dispatch = useDispatch();
    const { REACT_APP_API_SERVER } = process.env
    function getPrice() {
        console.log('calling price api ****!!!!')
        var prices = [] as any;
        for (const pair of avaliablePairs) {
            prices.push(Axios.get(
                `${REACT_APP_API_SERVER}/api/price/current?pair=${pair}`
                // `http://localhost:8080/api/price/current?pair=${pair}`
            ))
        };
        Promise.all(prices)
            .then((results: any) => {
                console.log(results)
                results = results.map((x: any) => x.data.data.close)
                var localLatestPrice: { [key: string]: string } = {}
                for (const idx in avaliablePairs) {
                    localLatestPrice[avaliablePairs[idx]] = Number(results[idx]).toFixed(5)
                }
                dispatch(loadPriceAction(localLatestPrice))
            });
    }
    useEffect(() => { // calling getPrice every min
        const timer = setInterval(
            () => getPrice(),
            60000
        );
        return () => clearInterval(timer);
    });
    useEffect(() => {
        getPrice()
        var coins = [] as any;
        for (const coinName of availableCoins) {
            coins.push(Axios.get(
                `https://api.coinstats.app/public/v1/coins/${coinName}?currency=USD`
            ))
        };
        Promise.all(coins)
            .then((results) => {
                setCrypto(results.map((x: any) => x.data.coin));
            });

    }, [dispatch]);

    return (
        <div className="chart">
            {/* <Container fluid> */}
            <InputGroup>
                <Link to="allcoin100" style={{ color: '#AEAEAE', textDecoration: 'none' }}> <h3>All  Cryptocurrencies</h3></Link>
                {/* <input
                    type="text"
                    placeholder="Search..."
                /> */}
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Control size="lg" type="text" placeholder="search coin"
                            onClick={() => {
                                history.push('/allcoin100');
                                // window.location.href = `${REACT_APP_API_SERVER}/allcoin100`;
                            }}
                        // onChange={(e) => {
                        //     setSearch(e.target.value);
                        // }}
                        />
                    </Form.Group>
                </Form>
            </InputGroup>
            <Table responsive>
                <thead>
                    <tr>
                        <td>Rank</td>
                        <td>Name</td>
                        <td>Symbol</td>
                        <td>Price</td>
                        <td>Market Cap</td>
                        <td>Volume(24hrs)</td>
                    </tr>
                </thead>
                {/* Mapping all the cryptos */}
                <tbody>
                    {/* Filtering to check for the searched crypto */}
                    {crypto
                        .filter((val: any) => {
                            return val.name.toLowerCase().includes(search.toLowerCase());
                        })
                        .map((val: any, id: number) => {
                            return (
                                <tr id={id.toString()} key={`coin_${id}`}>
                                    <td className="rank">{val.rank}</td>
                                    <td className="logo">
                                        <a href={val.websiteUrl}>
                                            <img src={val.icon} alt="logo" width="30px" />
                                        </a>
                                        <p>{val.name}</p>
                                    </td>
                                    <td className="symbol">{val.symbol}</td>
                                    <td>{latestPrice[pairMap[val.name]]}</td>
                                    <td>{val.marketCap.toFixed(0)}</td>
                                    <td>{val.volume.toFixed(0)}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            {/* </Container> */}
        </div>
    );
}

export default AllCoinPrice;
