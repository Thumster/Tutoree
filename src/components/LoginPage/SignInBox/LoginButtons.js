import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { signInAccount, signUpProvider } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";
import styled from "styled-components";

const SignInButton = styled.button`
  background-color: #326fa6;
  color: white;
  border-style: solid;
  border-color: #326fa6;
  width: 100%;
  height: 36px;
  :hover {
    background-color: white;
    color: #326fa6;
  }
`;

class LoginButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { isNewUser: false };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false,
      signInSuccessWithAuthResult: authResult => {
        this.setState({
          isNewUser: authResult.additionalUserInfo.isNewUser
        });
        if (this.state.isNewUser) {
          this.props.signUpProvider(authResult.user);
          this.setState({ isNewUser: false });
        }
        return false;
      }
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };

  handleValidSubmit(event, values) {
    event.preventDefault();
    this.setState({ values });
    this.props.signInAccount(values);
  }

  render() {
    const { authError } = this.props;

    return (
      <div>
        {this.state.isSignedIn ? (
          <Redirect to="/Dashboard" />
        ) : (
          <div className="container">
            <div className="row">
              <div className="col" style={lineStyle}>
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </div>
              <div className="col">
                <h3 style={{ color: "grey" }}>Sign In</h3>
                <AvForm onValidSubmit={this.handleValidSubmit}>
                  <AvGroup>
                    <AvInput
                      type="text"
                      name="email"
                      placeholder="email"
                      id="email"
                      style={{ marginTop: 17 }}
                      required
                    />
                    <AvFeedback>*Email invalid</AvFeedback>
                  </AvGroup>

                  <AvGroup>
                    <AvInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      id="password"
                      style={{ margin: "17px 0" }}
                      required
                    />
                    <AvFeedback>*Password required</AvFeedback>
                  </AvGroup>
                  <SignInButton>Sign In</SignInButton>
                  <div style={{ color: "red" }}>
                    {authError ? <p>{authError}</p> : null}
                  </div>
                </AvForm>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const lineStyle = {
  borderRight: "3px solid rgba(20, 20, 20, 0.1)"
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signInAccount: creds => dispatch(signInAccount(creds)),
    signUpProvider: newUser => dispatch(signUpProvider(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButtons);
//https://www.youtube.com/watch?v=zq0TuNqV0Ew
//https://www.youtube.com/watch?v=inM3epP9cMU&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3&index=24
