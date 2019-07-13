import React from "react";
import {
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import { connect } from "react-redux";

// const { auth } = props;
const PrivateRoute = ( { component: Component, ...rest}) => {
  const {auth} = rest;
  console.log('rest');
  console.log(rest);
  return(
  <div>
   <Route
    {...rest}
    render={props =>
      auth.uid ? (
        <Component {...props} />
      ) : (
        <div>
        {/* {console.log(auth)} */}
        <Redirect
          to={{
            pathname: "/"
          }}
        /></div>
      )
    }
  /></div>)
  };

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default withRouter(connect(
  mapStateToProps,
  null,
  null,
  {
    pure: false
  }
)(PrivateRoute));