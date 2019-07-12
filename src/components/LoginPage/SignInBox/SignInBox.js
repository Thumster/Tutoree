import React from 'react';
import './SignInBox.css';
import logo from './book_blue.png';
import LoginButtons from './LoginButtons';

class SignIn extends React.Component {

	render() {
	return (
		<div className="box">
			<img className="bookLogo" src={logo} />
			<h1 className="logo-name">Tutoree</h1>
			<LoginButtons/>
			<div className="boxFooter">
				<p style={{margin:"auto", color:"white"}}>Do not have an account? <a href="">Sign Up!</a></p>
			</div>
 
		</div>
	);}
}

export default SignIn;