import React from "react";
import styled from "styled-components";
import { DashboardHeader } from "../dashboard-header/dashboard-header";
import { Page } from "../../components/layout/page";
import { Sidebar } from "../../components/sidebar/sidebar";

type Props = React.PropsWithChildren<{}>

export function DashboardLayout({ children }: Props) {
  return (
    <PageWrapper>
      <DashboardHeader />

      <Layout>
        <Sidebar />
        
        <Main>
          {children}
        </Main>
      </Layout>
    </PageWrapper>
  );
}

const PageWrapper = styled(Page)`
  background-color: ${({ theme }) => theme.colors.lightShade};
`;

const Layout = styled.div`
  display: flex;
  height: calc(100% - ${({ theme }) => theme.header});
`;

const Main = styled.main`
  flex: 1;
`;
