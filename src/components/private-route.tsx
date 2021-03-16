import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { userSelectors } from "../features/user/user-slice";
import { routes } from "../routing/routes";
import { useStoreSelector } from "../store";

export function PrivateRoute(props: RouteProps) {
  const isLoggedIn = useStoreSelector(userSelectors.selectIsLoggedIn);

  if (!isLoggedIn) {
    return (
      <Redirect to={routes.login} />
    );
  }

  return (
    <Route {...props} />
  );
}
