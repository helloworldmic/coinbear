import React, { useState, FormEvent, useEffect } from "react";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import {
	RegisterAction,
	loadRegisterAction,
} from "../redux/registration/action";
import { IDashboardState } from "../redux/store";

export default function Registration() {
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pair, setPair] = useState('choose')

    const dispatch = useDispatch();

    // const isValidated = useSelector((state: IDashboardState) => state.registration.isValidated);
    // const firstName = useSelector((state: IDashboardState) => state.registration.firstName);
    // const lastName = useSelector((state: IDashboardState) => state.registration.lastName);
    // const userName = useSelector((state: IDashboardState) => state.registration.userName);
    // const email = useSelector((state: IDashboardState) => state.registration.email)
    // const password = useSelector((state: IDashboardState) => state.registration.password);
    // const pair = useSelector((state: IDashboardState) => state.registration.pair);

    // useEffect(() => {
    //     dispatch(register(true, 'bill', 'gates', 'billbybtc', "billgates@ms.com", '1234', 'btc'))
    // }, [dispatch])


    function submit(event: FormEvent<HTMLFormElement>) {  //handleSubmit
        dispatch(loadRegisterAction(validated, firstName, lastName, userName, email, password, pair)) //😖event.isValidated
        // thunk???
        // fetch(url, {...})
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation();

        }
        setValidated(true);  //--> can't change state here, only via redux 
        console.log(firstName, lastName, userName, email, password, pair)
    }

    return (
        <div className="container">
            <Form noValidate validated={validated} onSubmit={submit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label >First name</Form.Label> {/* column="lg" lg={2} */}
                        <Form.Control
                            required
                            type="text"
                            placeholder="Elon"
                            // defaultValue="Elon"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label >Last name</Form.Label> {/*  column="lg" lg={2} */}
                        <Form.Control
                            required
                            type="text"
                            placeholder="Musk"
                            // defaultValue="Musk"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label column="lg" lg={2}>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                value={userName}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>


                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label column="lg" lg={2}>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label column="lg" lg={2}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                </Row>


                {/* <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label column="lg" lg={2}>City</Form.Label>
                        <Form.Control type="text" placeholder="City" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label column="lg" lg={2}>State</Form.Label>
                        <Form.Control type="text" placeholder="State" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label column="lg" lg={2}>Zip</Form.Label>
                        <Form.Control type="text" placeholder="Zip" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid zip.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row> */}
                <Row className="mb-3">

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label >Crypto</Form.Label>
                        <Form.Select value={pair}
                            onChange={e => setPair(e.target.value)}>
                            {/*  defaultValue="Choose..." */}
                            <option value='btc'>Bitcoin(BTC)</option>
                            <option value='eth'>Ethereum(ETH)</option>
                            <option value='bch'>Bitcoin Cash(BCH)</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Check
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                            feedbackType="invalid"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit" value='submit'>
                    Register
                </Button>
            </Form>

        </div>
    )
}
