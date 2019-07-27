import React from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import Login from "../LoginPage/Login";
import Home from "../HomePage/Home";
import Dashboard from "../Dashboard/Dashboard";
import CreatePost from "../Post/CreatePost/CreatePost";
import PostDetails from "../Post/PostDetails/PostDetails";
import { connect } from "react-redux";
import NavBar from "../Nav/NavSearched";
import ProfilePage from "../ProfilePage/ProfilePage";

const Routes = props => {
  const { auth } = props;

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        auth.uid ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );

  return (
    <div>
      <Router>
        {auth.uid ? <NavBar/> : null}
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/CreatePost" component={CreatePost} />
          <PrivateRoute exact path="/Home" component={Home} />
          <PrivateRoute exact path="/Dashboard" component={Dashboard} />
          <PrivateRoute path="/Post/:id" component={PostDetails} />
          <PrivateRoute patj="/ProfilePage" component={ProfilePage} />
          <Route render={() => <Redirect to={{ pathname: "/Dashboard" }} />} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Routes);
