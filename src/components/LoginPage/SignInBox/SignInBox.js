import React from 'react';
import './SignInBox.css';
import logo from './book_blue.png';

class SignIn extends React.Component {
	render() {
	return (
		<div className="box">
			<img className="logo" src={logo} />
			<h1 className="logo-name">Tutoree</h1>
			<input className="input username" type="text" placeholder="Username" />
			<br/>
			<input className="input password" type="password" placeholder="Password" />
			<p className="forget">Forgot password?</p>
			<button className="button login-button">login</button>
			<div className="or">
			OR
			</div>
			<button className="button sign-up-button">Sign Up</button>
		</div>
	);}
}

export default SignIn;