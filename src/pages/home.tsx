import React from "react";
import styled from "styled-components";
import { PrimaryButton } from "../components/buttons/button";
import { Page } from "../components/layout/page";
import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar/sidebar";
import { Paragraph } from "../components/typography/paragraph";

export function Home() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <HomePage>
      <Navbar />
      <Layout>
        <Sidebar open={sidebarOpen} />
        <Main>
          <Container>
            <Paragraph>This is main</Paragraph>
            <PrimaryButton
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ width: "30%", marginTop: "2rem" }}
            >
              Sidebar
            </PrimaryButton>
          </Container>
        </Main>
      </Layout>
    </HomePage>
  );
}

const HomePage = styled(Page)`
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

const Container = styled.div`
  border: 1px solid red;
  margin: 0 auto;
  max-width: 70%;
`;
