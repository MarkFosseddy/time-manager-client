import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./private-route";
import { DashboardRoutes } from "./dashboard-routes";
import { routes } from "./routes";
import { useAutoLogin } from "../features/auth/use-auto-login";
import { useAlert } from "../features/alerts/use-alert";
import { AlertTypes } from "../features/alerts/alerts-types";
import { PageSpinner } from "../components/spinners/page-spinner";

const LoginPage = React.lazy(() =>
  import("../features/auth/login-page").then(m => ({ default: m.LoginPage }))
);
const NotFoundPage = React.lazy(() =>
  import("../features/not-found").then(m => ({ default: m.NotFoundPage }))
);

export function AppRoutes() {
  const { isLoading, error, autoLogin } = useAutoLogin();
  const alert = useAlert();

  React.useEffect(() => {
    autoLogin();
  }, []);

  React.useEffect(() => {
    if (error) {
      alert.show({ type: AlertTypes.Error, text: error });
    }
  }, [error]);

  if (isLoading) {
    return (
      <PageSpinner />
    )
  }

  return (
    <React.Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path={routes.home}>
          <Redirect to={routes.dashboard.base} />
        </Route>

        <Route exact path={routes.login} component={LoginPage} />
        <PrivateRoute path={routes.dashboard.base} component={DashboardRoutes} />

        <Route path="*" component={NotFoundPage} />
      </Switch>
    </React.Suspense>
  );
}
