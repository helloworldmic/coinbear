//for displaying transaction history table and uploading binance record
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import { loadTransactionAction } from '../redux/transaction/action';
import { IDashboardState } from '../redux/store'
import './ChartPie.scss';
import { Form } from 'react-bootstrap';
import FileInput from './FileInput';
import Axios from "axios";
import { Link } from 'react-router-dom';


function Transaction(props: any) {
    console.log(props)
    const tranx = useSelector((state: IDashboardState) => state.transaction.tranx);
    var limit = props.limit;
    const showFile = props.showFile;
    if (limit == -1) {
        limit = tranx.length;
    }

    const dispatch = useDispatch();
    const { REACT_APP_API_SERVER } = process.env
    useEffect(() => {
        console.log('~~~~~~~')
        Axios.get(
            `${REACT_APP_API_SERVER}/api/tranx/get_tranx`,
            // "http://localhost:8080/api/tranx/get_tranx",
            { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        ).then((resp) => {
            console.log(resp, '~~~~~~~')
            const tranxData = resp.data.data

            dispatch(loadTransactionAction(tranxData))
        })
    }, [])

    function fileInputRender() {
        if (showFile) {
            return <FileInput />
        } else {
            return
        }
    }

    return (
        <div className='chart'>
            <Link to="transaction" style={{ color: '#AEAEAE', textDecoration: 'none' }}> <h3>Transaction History</h3></Link>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>Side</th>
                        <th>Pair</th>
                        {/* pair means what you use to buy that coin, u can use crypto to buy another crypto, so better use pair */}
                        <th>Bought Price</th>
                        <th>Executed</th>
                        <th>Amount</th>
                        <th>Fee</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tranx
                        .map(((singleTranx: any) => {
                            return (
                                <tr>
                                    <td>{singleTranx.side}</td>
                                    <td>{singleTranx.pair}</td>
                                    <td>{singleTranx.executedPrice}</td>
                                    <td>{singleTranx.executed}</td>
                                    <td>{singleTranx.amount}</td>
                                    <td>{singleTranx.fee}</td>
                                    <td>{singleTranx.datetime}</td>
                                </tr>
                            )
                        })).slice(0, limit)}
                </tbody>
            </Table>
            {fileInputRender()}

        </div>

    )
}

Transaction.defaultProps = {
    limit: -1,
    showFile: true,
}

export default Transaction