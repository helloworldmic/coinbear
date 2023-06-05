import React, { useState, FormEvent, useEffect, Component } from "react";
import {
	Button,
	Form,
	Row,
	Col,
	InputGroup,
	FormGroup,
	Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, RouteProps, useHistory } from "react-router";
import { Dispatch } from "redux";
import { loginSuccess } from "../redux/auth/action";
// import { LoginAction, loadLoginAction, } from '../redux/login/action';
import { IAuthReducer } from "../redux/auth/reducer";
import { login } from "../redux/auth/thunk";
import "./Login.scss";
import { IDashboardState } from "../redux/store"; // =IRootState
import { REACT_APP_API_SERVER } from "../api";


export default function Login() {
	const history = useHistory(); //must inside function
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const msg = useSelector((state: IDashboardState) => state.auth.msg); //=IRootState
	const dispatch = useDispatch();
	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(username, password);

		if (username && password) {
			const requestLogin = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username: username, password: password }),
			};

			// `${REACT_APP_API_SERVER}/api/transaction/transaction`
			const resp = await fetch(
				`${REACT_APP_API_SERVER}/api/users/login`,
				requestLogin
			);
			let result = await resp.json();
			localStorage.setItem("token", result.token);
			dispatch(loginSuccess());
			console.log("resp:", resp);
			console.log(result);

			if (resp.status == 200) {
				history.push('/dashboard')
				// window.location.href = "http://localhost:3000/dashboard";
			} else {
				alert("Login unsuccessful");
			}
		}

		function ToDashboard() {
			const isAuthenticated = useSelector(
				(state: IDashboardState) => state.auth.isAuthenticated
			);
			if (isAuthenticated) return <Redirect to="/dashboard" />;
			else return <Redirect to="/login" />;
		}
	};

	return (
		<div className="login">
			<Form onSubmit={onSubmit}>
				<FormGroup className="mb-3">
					<Form.Label>
						<h1>Username</h1>
					</Form.Label>
					<Form.Control
						size="lg"
						type="string"
						name="userName"
						placeholder="Type in Username"
						onChange={(e) => setUsername(e.target.value)} // innerRef={register}
					/>
				</FormGroup>
				<FormGroup className="mb-3">
					<Form.Label>
						<h1>Password</h1>
					</Form.Label>
					<Form.Control
						size="lg"
						type="password"
						name="password"
						placeholder="Type in Password"
						onChange={(e) => setPassword(e.target.value)} // innerRef={register}
					/>
				</FormGroup>
				{/* {msg ?
                <Alert color="danger">
                    {msg}
                </Alert> : "Invalid username or password"
            } */}
				<Button size="lg" variant="primary" type="submit">
					Submit
				</Button>
				{/* <Form.Control type='submit' value="Login" />
                <hr /> */}
			</Form>
		</div>
	);
}

//  function Redirect ({ component, ...rest }: RouteProps){
//     const isAuthenticated = useSelector((state:IDashboardState)=>state.auth.isAuthenticated); //IRootState
//     const Component = component;
//     if (Component == null) {
//         return null;
//     }
//     let render:(props:any)=>JSX.Element
//     if(isAuthenticated){
//         render = (props:any)=>(
//             <Component {...props} />
// ) }else{
//         render = (props:any)=>(
//             <Redirect
//             to={ {
//                 pathname: '/dashboard',
//                 state: { from: props.location }
//             } } />
// ) }
//     return <Route {...rest} render={render}/>
// };

//janet's
// function submit(event: FormEvent<HTMLFormElement>) {  //handleSubmit
//     dispatch(loadLoginAction(userName, email, password))
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//         event.preventDefault()
//         event.stopPropagation();
//     }
// }

// return (
//     <div className="container">
//         <Form>
//             <Row className="mb-3">
//                 <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//                     <Form.Label column="lg" lg={2}>Username</Form.Label>
//                     <InputGroup hasValidation>
//                         <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//                         <Form.Control
//                             type="text"
//                             placeholder="Username"
//                             aria-describedby="inputGroupPrepend"
//                             required
//                             value={userName}
//                             onChange={e => setUsername(e.target.value)}
//                         />

//                     </InputGroup>
//                 </Form.Group>
//             </Row>

//             <Row className="mb-3">
//                 <Form.Group as={Col} controlId="formGridEmail">
//                     <Form.Label column="lg" lg={2}>Email</Form.Label>
//                     <Form.Control type="email" placeholder="Enter email"
//                         value={email}
//                         onChange={e => setEmail(e.target.value)} />
//                 </Form.Group>

//                 <Form.Group as={Col} controlId="formGridPassword">
//                     <Form.Label column="lg" lg={2}>Password</Form.Label>
//                     <Form.Control type="password" placeholder="Password"
//                         value={password}
//                         onChange={e => setPassword(e.target.value)} />
//                 </Form.Group>
//             </Row>

//             <Button variant="primary" type="submit" value='submit'>
//                 Login
//             </Button>
//         </Form>
//     </div>
// )
