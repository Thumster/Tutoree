import React from "react"
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom"
import Login from '../LoginPage/Login';
import Home from '../HomePage/Home';
import Post from '../Post/Post';
import PostDetails from '../Post/PostDetails'

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Post" component={Post} />
                    <Route exact path="/Home" component={Home} />
                    <Route path="/Post/:id" component={PostDetails}/>
                    <Route render={() => <Redirect to={{pathname: "/Home"}} />} />
                </Switch>
            </Router>
        </div>
    )
}

export default Routes
