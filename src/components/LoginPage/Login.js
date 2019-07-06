import React from 'react';
import './Login.css'
import SignIn from  './SignInBox/SignInBox'; 
import Catchphrse from './Catchphrase/Catchphrase';

function Login() {
  return (
    <div className="Login">
      <Catchphrse/>
      <SignIn/>
    </div>
  );
}

export default Login;
