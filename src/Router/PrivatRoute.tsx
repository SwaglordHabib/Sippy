import React from 'react';
import { Redirect, Route } from 'react-router';

export interface IPrivateRouteProps {
}

// TODO replace with auth
export const PrivateRoute: React.FunctionComponent<IPrivateRouteProps> = (props: React.PropsWithChildren<IPrivateRouteProps>) => {
    return (
        <Route render={() => {
            return true
                ? props.children
                : <Redirect to={"/signin"} />;
        }} />
    );
};