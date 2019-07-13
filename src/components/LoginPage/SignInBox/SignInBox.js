import React from "react";
import "./SignInBox.css";
import logo from "./book_blue.png";
import LoginButtons from "./LoginButtons";
import SignUp from "./SignUp";
import { connect } from "react-redux";

const SignIn = props => {
  const { auth } = props;

  return (
    <div className="box">
      <img className="bookLogo" src={logo} />
      <h1 className="logo-name">Tutoree</h1>
      <LoginButtons />
      {!auth.uid ? (
        <div className="boxFooter">
          <p style={{ margin: "auto", color: "white" }}>
            Do not have an account? <SignUp />
          </p>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(SignIn);
