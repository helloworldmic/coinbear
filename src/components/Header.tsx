import './Header.module.scss'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import AllCoin100 from './AllCoin100'
import { Form, Button, FormControl } from 'react-bootstrap'

function Header() {
    return (

        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container className='headerContainer'>
                    <Nav.Link href="/hometodash"><h3>Coinbear</h3></Nav.Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/dashboard"><h5>Dashboard</h5></Nav.Link>
                            <Nav.Link href="/portfolio"><h5>Portfolio</h5></Nav.Link>
                            <Nav.Link href="/transaction"><h5>Transaction</h5></Nav.Link>
                            <Nav.Link href="/trade"><h5>Trade</h5></Nav.Link>
                            <Nav.Link href="/allcoin100"><h5>All Crypto Prices</h5></Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link eventKey={2} href="/login">Login</Nav.Link>
                            {/* <Nav.Link href="/logout">Logout</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                    <Form className=" search d-flex">
                        <FormControl
                            size="lg"
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="dark">Search</Button>
                    </Form>
                </Container>
            </Navbar>
        </div>
    )
}
export default Header