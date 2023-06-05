//for posting trade form
import { FormEvent, useEffect, useState } from "react";
import { Button, Dropdown, Form, InputGroup, Tab, Tabs } from "react-bootstrap";
import useDebounce from "../hooks/useDebounce";
import "./ChartPie.scss";
import { IDashboardState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { REACT_APP_API_SERVER } from "../api";


export default function TradeLimited() {
    const [pair, setPair] = useState("BTC-USD");
    const [currentPrice, setCurrentPrice] = useState(0.00001);
    const latestPrice = useSelector(
        (state: IDashboardState) => state.price.latestPrice
    );
    const [limitedPrice, setLimitedPrice] = useState(0);

    const [executed, setExecuted] = useState(0); // executed = amount of coins bought
    const [amount, setAmount] = useState(0); // amount= amount of money

    const debouncedExecuted = useDebounce<number>(executed, 500);
    const debouncedAmount = useDebounce<number>(amount, 500);

    useEffect(() => {
        setCurrentPrice(latestPrice[pair]);
    }, [pair, latestPrice]);
    let newAmount = currentPrice * debouncedExecuted;
    useEffect(() => {
        setAmount(newAmount);
    }, [currentPrice, debouncedExecuted]);

    let newExecuted = debouncedAmount / currentPrice;
    useEffect(() => {
        setExecuted(newExecuted);
    }, [currentPrice, debouncedAmount]);

    // let isBuy: boolean -->should not do this outside a function in react
    const clickHandler = (isBuy: boolean) => async () => {
        console.log(isBuy);
        var timestamp = Date.now();
        var date = new Date(timestamp).toString();
        let fee = 0.1;
        if (isBuy === true && limitedPrice == currentPrice) {
            const requestBuyCoins = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }, // "Content-Type": "application/json" stil need
                body: JSON.stringify({
                    side: "BUY",
                    pair: pair,
                    executedPrice: currentPrice,
                    executed: newExecuted,
                    amount: newAmount,
                    fee: fee,
                    unixTimestamp: timestamp,
                    dataTime: date,
                }),
            };

            //    'http://127.0.0.1:8080/api/transaction/transaction'
            const resp = await fetch(
                `${REACT_APP_API_SERVER}/api/transaction/transaction`,
                requestBuyCoins
            );
            var result = await resp.json;

            if (resp.status == 200) {
                alert("Bought successfully")
            } else {
                alert("Fail to buy")
            }
        }
        // sell
        else if (limitedPrice == currentPrice) {
            const requestSellCoins = {
                method: "POST",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                body: JSON.stringify({
                    side: "SELL",
                    pair: pair,
                    executedPrice: currentPrice,
                    executed: newExecuted,
                    amount: newAmount,
                    fee: fee,
                    unixTimestamp: timestamp,
                    dataTime: date,
                }),
            };
            const resp = await fetch(
                `${REACT_APP_API_SERVER}/api/transaction/transaction`,
                requestSellCoins
            );
            var result = await resp.json;


            if (resp.status == 200) {
                alert("Sold successfully")
            } else {
                alert("Fail to sell")
            }
        }
    };


    return (
        <div className="chart">
            <Link to="trade" style={{ color: '#AEAEAE', textDecoration: 'none' }}> <h3>Limited Price Trade</h3></Link>
            <Form className="justify-content-md-center">
                <Form.Group className="mb-3" controlId="pair">
                    <InputGroup>
                        <Dropdown
                            onSelect={(eventKey, e: any) =>
                                setPair(e.target.getAttribute("value"))
                            }
                        >
                            <Dropdown.Toggle
                                variant="outline-secondary"
                                size="lg"
                                id="dropdown-basic"
                            >
                                {pair}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item value="BTC-USD">BTC-USD</Dropdown.Item>
                                <Dropdown.Item value="ETH-USD">ETH-USD</Dropdown.Item>
                                <Dropdown.Item value="SAND-USD">SAND-USD</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <h4 style={{ color: "#AEAEAE" }}> USD$ {currentPrice}</h4>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="coinExecuted">
                    <Form.Label style={{ color: "#AEAEAE" }}>Amount of coin</Form.Label>
                    <InputGroup>
                        <Form.Control
                            size="lg"
                            className="w-45 d-inline mr-3" // should be the class that makes arrow increment
                            type="number"
                            step="0.01"
                            value={executed}
                            onChange={(e) => setExecuted(Number(e.target.value))}
                        ></Form.Control>
                        <Button variant="success">+</Button>
                        <Button variant="danger">-</Button>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="coinAmount">
                    <Form.Label style={{ color: "#AEAEAE" }}>Total USDT</Form.Label>
                    <Form.Control
                        size='lg'
                        className="w-45 d-inline"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="limitedPrice">
                    <Form.Label style={{ color: "#AEAEAE" }}>limited price in USDT</Form.Label>
                    <Form.Control
                        size='lg'
                        className="w-45 d-inline"
                        type="number"
                        value={limitedPrice}
                        onChange={(e) => setLimitedPrice(Number(e.target.value))}
                    ></Form.Control>
                </Form.Group>
                <h5 style={{ color: '#AEAEAE', textDecoration: 'none' }}> Current Account Balance: 10402 USDT</h5>
                <Button
                    variant="success"
                    size="lg"
                    // type="submit"
                    value="submit"
                    onClick={clickHandler(true)}
                >
                    Buy
                </Button>{" "}
                <Button
                    variant="danger"
                    size="lg"
                    // type="submit"
                    value="submit"
                    onClick={clickHandler(false)}
                >
                    Sell
                </Button>
            </Form>
        </div >
    )
}