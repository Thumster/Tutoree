import React from "react"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import Login from '../LoginPage/Login';
import Home from '../HomePage/Home';
import NotFound from './NotFound';
import Post from '../Post/Post';

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Post" component={Post} />
                    <Route component={Home} />
                </Switch>
            </Router>
        </div>
    )
}

export default Routes
