
import React from 'react';
import { Switch, Route, Router } from 'react-router';
import { App } from '../App';
import { SignIn } from '../Pages/SignIn/SignIn';
import { SignUp } from '../Pages/SignUp/SignUp';
import history from './history';
import { PrivateRoute } from './PrivatRoute';


export const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route path={"/signin"} component={SignIn} />
                <Route path={"/signup"} component={SignUp} />
                <PrivateRoute>
                    <App />
                </PrivateRoute>
            </Switch>
        </Router>
    );
};