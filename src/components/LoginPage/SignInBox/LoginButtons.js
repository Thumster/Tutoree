import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./SignInBox.css";
import { Redirect } from "react-router-dom";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG, SSL_OP_SINGLE_DH_USE } from "constants";
import { genericTypeAnnotation } from "@babel/types";

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
          <div className="container">
            <div className="row">
              <div className="col" style={lineStyle}>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
          </div>
          <div className="col">
            <h3 style={{color:"grey"}}>Sign In</h3>
              <form>
                <input type="email" className="form-control" placeholder="Email" style={{marginTop:17}} />
                <input type="password" className="form-control" placeholder="Password" style={{margin:"17px 0"}}/>
                <button id="dopebutton">Sign In</button>
              </form>
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
export default LoginButtons;
//https://www.youtube.com/watch?v=zq0TuNqV0Ew
