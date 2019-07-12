import React from "react"
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom"
import Login from '../LoginPage/Login';
import Home from '../HomePage/Home';
import Dashboard from '../Dashboard/Dashboard';
import CreatePost from '../Post/CreatePost';
import PostDetails from '../Post/PostDetails'
import{connect} from 'react-redux'

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/CreatePost" component={CreatePost} />
                    <Route exact path="/Home" component={Home} />
                    <Route exact path="/Dashboard" component={Dashboard}/>
                    <Route path="/Post/:id" component={PostDetails}/>
                    <Route render={() => <Redirect to={{pathname: "/Home"}} />} />
                </Switch>
            </Router>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        
    }
}

export default connect(mapStateToProps)(Routes)
