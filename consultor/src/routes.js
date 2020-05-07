import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import { isAuthenticated } from './auth'

import Login from './pages/Login'
import Chat from './pages/Chat'
import Participantes from './pages/Participantes'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => 
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: {from: props.location} }} />
        )
    } />
)


export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoute path="/chat" component={Chat} />
                <PrivateRoute path="/participantes" component={Participantes} />
            </Switch>
        </BrowserRouter>
    )
}