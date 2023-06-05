import React from 'react';
import { Container, Row, Col, Image, Button, Navbar } from 'react-bootstrap';
// import { AuthService } from '../services'
import LogoBear from './img/logobear.jpeg'
import Wave from './img/wave.svg'
import './Home.scss'
import Login from './Login';


function Home() {
    return (
        <div className='home'>
            <Container fluid>
                {/* <Image src={Wave} className='position-fixed h-100'></Image> -->keep this as background img setting */}
                {/* <Navbar className='z-100'>
                <Navbar.Brand href='./'><img src={Logo} alt='PaperCoin' /></Navbar.Brand>
            </Navbar> */}

                <Row >
                    <Col className='d-flex sm={6}' style={{ pointerEvents: 'none' }}>
                        <Image src={LogoBear} className='mx-auto my-auto h-60' fluid></Image>
                    </Col>
                    <Col className='d-flex sm={6}'>
                        <div className='mx-auto my-auto'>
                            <h1>Welcome to Coinbear</h1>
                            <h3>Go to Dashboard</h3>
                            <Button variant='primary' size='lg' className='mt-3' href='./dashboard'>Dashboard!</Button>

                        </div>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}
export default Home