import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./SignInBox.css";
import { Redirect } from "react-router-dom";

// firebase.initializeApp({
//   apiKey: "AIzaSyDVScOjOKGbRD_ruKiZj4sMI94Xlrdk5JI",
//   authDomain: "tutoree-52fe1.firebaseapp.com"
// });

class LoginButtons extends Component {
  state = {
    userDetails:{'name': "", 'email': "", 'photoUrl': "" }
  };

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
    //   if (user) {
    //           console.log(userProfile.getName());
    //     // this.setState({
    //     //   name: firebase.auth().currentUser.displayName,
    //     //   email: firebase.auth().currentUser.email,
    //     //   photoUrl: firebase.auth().currentUser.photoURL
    //     // });
    //     // console.log("signed in");
    //   } else {
    //       userProfile.signOut();
    //       console.log("Signed Out");
    //     // this.setState({ name: "", email: "", photoUrl: "" });
    //   }
    });
  };

  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <div>
            <img
              className="user-icon"
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
            <h2>Signed in as {firebase.auth().currentUser.displayName}</h2>
            <button
              className="button sign-out-button"
              onClick={() => firebase.auth().signOut()}
            >
              Sign Out
            </button>
            {/* <Redirect to = "/home"/> */}
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
//https://www.youtube.com/watch?v=zq0TuNqV0Ew
