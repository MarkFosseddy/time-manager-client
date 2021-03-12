import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./private-route";
import { routes } from "./routes";

const Login = React.lazy(() => import("../pages/login").then(m => ({ default: m.Login })));
const Home = React.lazy(() => import("../pages/home").then(m => ({ default: m.Home })));

const NotFound = React.lazy(() => import("./not-found-page").then(m => ({ default: m.NotFoundPage })));

export function AppRoutes() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <PrivateRoute exact path={routes.home} component={Home} />
        <Route path={routes.login} component={Login} />

        <Route path="*" component={NotFound} />
      </Switch>
    </React.Suspense>
  );
}
