import React from "react";
import { Redirect, Switch } from "react-router";
import { DashboardLayout } from "../features/dashboard-layout/dashboard-layout";
import { PrivateRoute } from "./private-route";
import { routes } from "./routes";

const DashboardIndexPage = React.lazy(() =>
  import("../features/dashboard-index/dashboard-index-page")
    .then(m => ({ default: m.DashboardIndexPage }))
);

export function DashboardRoutes() {
  return (
    <DashboardLayout>
      <Switch>
        <PrivateRoute exact path={routes.dashboard.base} component={DashboardIndexPage} />

        <Redirect to={routes.notFound} />
      </Switch>
    </DashboardLayout>
  );
}

