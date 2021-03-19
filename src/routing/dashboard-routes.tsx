import React from "react";
import { Redirect, Switch } from "react-router";
import styled from "styled-components";
import { Header } from "../components/header/header";
import { Page } from "../components/layout/page";
import { PrivateRoute } from "../components/private-route";
import { Sidebar } from "../components/sidebar/sidebar";
import { routes } from "./routes";

const Dashboard = React.lazy(() =>
  import("../pages/dashboard").then(m => ({ default: m.Dashboard }))
);

export function DashboardRoutes() {
  return (
    <PageWrapper>
      <Header />

      <Layout>
        <Sidebar />

        <Main>
          <Switch>
            <PrivateRoute exact path={routes.dashboard.base} component={Dashboard} />

            <Redirect to={routes.notFound} />
          </Switch>
        </Main>
      </Layout>
    </PageWrapper>
  );
}

const PageWrapper = styled(Page)`
  background-color: ${({ theme }) => theme.colors.lightShade};
`;

const Main = styled.main`
  flex: 1;
`;

const Layout = styled.div`
  display: flex;
  height: calc(100% - ${({ theme }) => theme.header});
`;
