import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

export const PrivateRoute: React.FunctionComponent<RouteProps> = (
  props: React.PropsWithChildren<RouteProps>
) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [fetches, setFetch] = React.useState(0);

  React.useEffect(() => {
    if (fetches === 0) {
      setFetch(1);
      fetch("http://localhost:8080/api/auth", {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
      })
        .then((response) => {
          setIsAuthenticated(response.status === 200);
          setIsLoaded(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setIsLoaded(true);
        });
    }
  }, [fetches]);
  return (
    <>
      {isLoaded && (
        <Route
          path={props.path}
          exact={props.exact}
          render={() => {
            return isAuthenticated ? (
              props.children
            ) : (
              <Redirect to={"/signin"} />
            );
          }}
        />
      )}
    </>
  );
};
