import React from "react"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import Login from '../LoginPage/Login';
import Home from '../HomePage/Home';
import NotFound from './NotFound';
// import Nav from '../Nav/Nav';

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/Home" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </div>
    )
}

export default Routes
