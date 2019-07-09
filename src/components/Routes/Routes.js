import React from "react"
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom"
import Login from '../LoginPage/Login';
import Home from '../HomePage/Home';
<<<<<<< HEAD
// import NotFound from './NotFound';
=======
import NotFound from './NotFound';
import Post from '../Post/Post';
>>>>>>> e234af0c4055e315e02259bb2891fb75398a72bf

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/Home" component={Home} />
<<<<<<< HEAD
                    <Route render={() => <Redirect to={{pathname: "/Home"}} />} />
=======
                    <Route path="/Post" component={Post} />
                    <Route component={Home} />
>>>>>>> e234af0c4055e315e02259bb2891fb75398a72bf
                </Switch>
            </Router>
        </div>
    )
}

export default Routes
