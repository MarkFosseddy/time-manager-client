import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../components/private-route";
import { DashboardRoutes } from "./dashboard-routes";
import { routes } from "./routes";

const Login = React.lazy(() =>
  import("../pages/login").then(m => ({ default: m.Login }))
);
const NotFound = React.lazy(() =>
  import("../pages/not-found").then(m => ({ default: m.NotFound }))
);

export function AppRoutes() {
  return (
    <React.Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path={routes.home}>
          <Redirect to={routes.dashboard.base} />
        </Route>

        <Route exact path={routes.login} component={Login} />
        <PrivateRoute path={routes.dashboard.base} component={DashboardRoutes} />

        <Route path="*" component={NotFound} />
      </Switch>
    </React.Suspense>
  );
}
