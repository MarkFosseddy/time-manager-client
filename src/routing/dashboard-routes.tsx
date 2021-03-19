import React from "react";
import { Redirect, Switch } from "react-router";
import styled from "styled-components";
import { Header } from "../components/header/header";
import { Page } from "../components/layout/page";
import { PrivateRoute } from "../components/private-route";
import { Sidebar } from "../components/sidebar/sidebar";
import { PageSpinner } from "../components/spinners/page-spinner";
import { Heading } from "../components/typography/heading";
import { Paragraph } from "../components/typography/paragraph";
import { useFetchTasks } from "../features/tasks/tasks-hooks";
import { routes } from "./routes";

const Dashboard = React.lazy(() =>
  import("../pages/dashboard").then(m => ({ default: m.Dashboard }))
);
const Task = React.lazy(() =>
  import("../pages/task").then(m => ({ default: m.Task }))
);

export function DashboardRoutes() {
  const { isLoading, error, fetchTasks } = useFetchTasks();

  React.useEffect(() => {
    fetchTasks();
  }, []);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (error) {
    return (
      <Page>
        <Heading className="mb-32">Error accured :(</Heading>
        <Paragraph>Try to reload the page.</Paragraph>
      </Page>
    );
  }

  return (
    <PageWrapper>
      <Header />

      <Layout>
        <Sidebar />

        <Main>
          <Switch>
            <PrivateRoute exact path={routes.dashboard.base} component={Dashboard} />
            <PrivateRoute exact path={routes.dashboard.taskList + "/:id"} component={Task} />

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
