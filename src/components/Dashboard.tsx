import * as React from 'react';
import DashboardStyle from './Dashboard.module.scss'
import CandleStickFn from './CandlStickFn';
// import GoogleChart from './GoogleChart';
import Portfolio from './Portfolio';
import Transaction from './Transaction';
import PieChart from './ChartPie';
import ChartLine from './ChartLine';
import BrushChartFn from './ChartBrushFn';
import BrushChartClass from './ChartBrushClass';
import Trade from './Trade';
import FileInput from './FileInput';
import { Breadcrumb, Button, Col, Container, Form, Row } from 'react-bootstrap';
import AllCoinPrice from './AllCoinPrice';
import ChartMultiLine from './ChartMultiLine';
import { useDispatch, useSelector } from 'react-redux'
import { IDashboardState } from '../redux/store'
import BitcoinLogo from './img/btc_logo.svg'
function Dashboard() {
    const latestPrice = useSelector((state: IDashboardState) => state.price.latestPrice);

    return (
        // <Container className='flex-container'>
            <div >
                <div className='chart'>

                    {/* <img className='bitcoinLogo' src={BitcoinLogo} /> ----> need to make it fit into div */}
                    <h4 style={{ color: "#AEAEAE" }}> BITCOIN Current Price: {latestPrice['BTC-USD']}</h4>
                </div>
                {/* <Container className='justify-content-md-end'><FileInput /></Container> */}
                <Container fluid className='flex-container'>
                    <Row className='mb-3'>
                    </Row>
                    <Row className='mb-3'>
                        <Col sm={8}>
                            <CandleStickFn />
                        </Col>
                        <Col sm={4}>
                            <AllCoinPrice />
                        </Col>
                    </Row>

                    <Row className='mb-3'>
                        <Col className={DashboardStyle.chartContainer} sm={3}>
                            <Trade />
                        </Col>
                        <Col className={DashboardStyle.chartContainer} sm={4}>
                            <PieChart />
                        </Col>
                        <Col className={DashboardStyle.chartContainer} sm={5} style={{ maxHeight: '500px' }}>
                            <Transaction limit={3} showFile={false} />
                        </Col>
                    </Row>

                    <Row className='mb-3'>
                        <Col className={DashboardStyle.chartContainer} sm={12}>
                            <ChartMultiLine />
                        </Col>
                    </Row>
                </Container>

            </div>

        // </Container>
    )
}


export default Dashboard