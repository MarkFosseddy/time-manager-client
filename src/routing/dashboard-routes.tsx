import React from "react";
import { Redirect, Switch } from "react-router";
import styled from "styled-components";
import { Page } from "../components/layout/page";
import { Navbar } from "../components/navbar";
import { PrivateRoute } from "../components/private-route";
import { Sidebar } from "../components/sidebar/sidebar";
import { routes } from "./routes";

const Home = React.lazy(() => import("../pages/home").then(m => ({ default: m.Home })));

export function DashboardRoutes() {
  React.useEffect(() => {
    console.log("WTIF THIS IS DASHBPARD HOME")
  }, []);

  return (
    <PageWrapper>
      <Navbar />

      <Layout>
        <Sidebar />

        <Main>
          <Switch>
            <PrivateRoute exact path={routes.dashboard.base} component={Home} />

            <PrivateRoute exact path={routes.dashboard.taskList + "/:id"}>
              <h1>This is a task</h1>
            </PrivateRoute>

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
  /* @TODO: add header height to theme */
  height: calc(100% - 54px);
`;
