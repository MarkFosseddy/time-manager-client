import React from "react";
import styled from "styled-components";
import { PrimaryButton } from "../components/buttons/button";
import { Paragraph } from "../components/typography/paragraph";

export function Home() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Container>
      <Paragraph>This is main</Paragraph>
      <PrimaryButton
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{ width: "30%", marginTop: "2rem" }}
      >
        Sidebar
      </PrimaryButton>
    </Container>
  );
}

const Container = styled.div`
  border: 1px solid red;
  margin: 0 auto;
  max-width: 70%;
`;
