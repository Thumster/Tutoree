import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./SignInBox.css";
import { connect } from "react-redux";
import { signInAccount, signUpProvider } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class LoginButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creds: {
        email: "",
        password: ""
      },
      isNewUser: false
    };
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
      signInSuccessWithAuthResult: (authResult) => {
        this.setState({
          isNewUser: authResult.additionalUserInfo.isNewUser
        })
        if (this.state.isNewUser) {
          this.props.signUpProvider(authResult.user);
          console.log('new user');
          this.setState({ isNewUser: false })
        } else {
          console.log('old user');
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

  handleChange = e => {
    var newCreds = this.state.creds;
    newCreds[e.target.id] = e.target.value;
    this.setState({
      creds: newCreds
    });
    console.log(this.state.creds);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signInAccount(this.state.creds);
  };

  render() {
    const { auth, authError } = this.props;

    return (
      <div>
        {this.state.isSignedIn ?
          <Redirect to='/Dashboard'></Redirect>
          :
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
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="email"
                    id="email"
                    style={{ marginTop: 17 }}
                    onChange={this.handleChange}
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    id="password"
                    style={{ margin: "17px 0" }}
                    onChange={this.handleChange}
                  />
                  <button id="dopebutton">Sign In</button>
                  <div style={{ color: "red" }}>
                    {authError ? <p>{authError}</p> : null}
                  </div>
                </form>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

const lineStyle = {
  borderRight: "3px solid rgba(20, 20, 20, 0.1)"
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
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
