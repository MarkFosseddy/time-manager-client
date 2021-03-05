import React from "react";
import { Switch, Route } from "react-router-dom";

import { routes } from "./routes";

const Login = React.lazy(() => import("../pages/login").then(m => ({ default: m.Login })));

export function AppRoutes() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path={routes.home}>
          <div>
            <h1>Home Page</h1>
          </div>
        </Route>

        <Route path={routes.login} component={Login} />
      </Switch>
    </React.Suspense>
  );
}
