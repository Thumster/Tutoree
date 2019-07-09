import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./SignInBox.css";
import { Redirect } from "react-router-dom";

firebase.initializeApp({
  apiKey: "AIzaSyDVScOjOKGbRD_ruKiZj4sMI94Xlrdk5JI",
  authDomain: "tutoree-52fe1.firebaseapp.com"
});

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;
}

class LoginButtons extends Component {
  state = { isSignedIn: false };
  

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };

  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <div>
            <img className="user-icon" alt="profile picture" src={photoUrl} />
            <h2>Signed in as {name}</h2>
            <button
              className="button sign-out-button"
              onClick={() => firebase.auth().signOut()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

export default LoginButtons;
export {name, email, photoUrl};
//https://www.youtube.com/watch?v=zq0TuNqV0Ew
