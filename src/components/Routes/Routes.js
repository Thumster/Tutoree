import React from "react"
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom"
import Login from '../LoginPage/Login';
import Home from '../HomePage/Home';
import Post from '../Post/Post';
import Searched from '../SearchedPage/Searched';

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Post" component={Post} />
                    <Route path="/Searched" component={Searched} />
                    <Route render={() => <Redirect to={{pathname: "/Home"}} />} />
                </Switch>
            </Router>
        </div>
    )
}

export default Routes
