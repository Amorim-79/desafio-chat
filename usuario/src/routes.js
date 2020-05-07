import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './pages/Login'
import Chat from './pages/Chat'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/chat" component={Chat} />
            </Switch>
        </BrowserRouter>
    )
}