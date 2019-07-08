import React from 'react';
import './SignInBox.css';
import logo from './book_blue.png';
import Facebook from './Facebook'

class SignIn extends React.Component {
	constructor(props){
		super(props);
		this.state={
			logout:false
		}
	}

	logout=()=>{
		this.setState({logout:true});
	}

	render() {
	return (
		<div className="box">
			<img className="logo" src={logo} />
			<h1 className="logo-name">Tutoree</h1>
			{/* <input className="input username" type="text" placeholder="Username" />
			<br/>
			<input className="input password" type="password" placeholder="Password" />
			<p className="forget">Forgot password?</p>
			<button className="button login-button">login</button>
			<div className="or">
			OR
			</div>
			<button className="button sign-up-button">Sign Up</button> */}
			<br/>
			<Facebook logout={this.state.logout} />
			<br/>
			<button className="button sign-up-button" onClick={this.logout}>Log Out</button> 
		</div>
	);}
}

export default SignIn;