//https://www.geeksforgeeks.org/how-to-create-a-cryptocurrency-app-in-reactjs/
import "./AllCoin100.scss";
import Axios from "axios";
import { useEffect, useState } from "react";

function AllCoin100() {

    // Setting up the initial states using
    // react hook 'useState'
    const [search, setSearch] = useState("" as any);
    const [crypto, setCrypto] = useState([] as any);

    // Fetching crypto data from the API only
    // once when the component is mounted
    useEffect(() => {
        Axios.get(
            `https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=USD`
        ).then((res) => {
            console.log(res.status)
            console.log(res.data.coins)
            setCrypto(res.data.coins);
        });
    }, []);

    return (
        <div className="AllCoin100">
            <h1>All Cryptocurrencies</h1>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <table>
                <thead>
                    <tr>
                        <td>Rank</td>
                        <td>Name</td>
                        <td>Symbol</td>
                        <td>Market Cap</td>
                        <td>Price</td>
                        <td>Available Supply</td>
                        {/* <td>Volume(24hrs)</td> */}
                    </tr>
                </thead>
                {/* Mapping all the cryptos */}
                <tbody>
                    {/* Filtering to check for the searched crypto */}
                    {crypto
                        .filter((val: any) => {
                            return val.name.toLowerCase().includes(search.toLowerCase());
                        })
                        .map((val: any, id: string | undefined) => {
                            return (
                                <>
                                    <tr id={id}>
                                        <td className="rank">{val.rank}</td>
                                        <td className="logo">
                                            <a href={val.websiteUrl}>
                                                <img src={val.icon} alt="logo" width="30px" />
                                            </a>
                                            <p>{val.name}</p>

                                        </td>
                                        <td className="symbol">{val.symbol}</td>
                                        <td>{val.marketCap}</td>
                                        <td>USD{val.price.toFixed(5)}</td>
                                        <td>{val.availableSupply}</td>
                                        {/* <td>{val.volume.toFixed(0)}</td> */}
                                    </tr>
                                </>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default AllCoin100;
