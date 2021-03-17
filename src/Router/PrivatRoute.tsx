import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export interface IPrivateRouteProps {
    // path: string;
}



// TODO replace with auth
export const PrivateRoute: React.FunctionComponent<RouteProps> = (props: React.PropsWithChildren<RouteProps>) => {
    return (
        <Route {...props} render={() => {
            return true
                ? props.children
                : <Redirect to={"/signin"} />;
        }} />
    );
};