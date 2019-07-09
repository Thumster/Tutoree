import React from 'react';
import './SignInBox.css';
import logo from './book_blue.png';
import LoginButtons from './LoginButtons';

class SignIn extends React.Component {

	render() {
	return (
		<div className="box">
			<img className="logo" src={logo} />
			<h1 className="logo-name">Tutoree</h1>
			<LoginButtons/>
			<br/>
 
		</div>
	);}
}

export default SignIn;