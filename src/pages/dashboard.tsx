import React from "react";
import styled from "styled-components";
import { Heading } from "../components/typography/heading";

export function Dashboard() {
  return (
    <Container>
      <Heading>This is main</Heading>
    </Container>
  );
}

export const Container = styled.div`
  border: 1px solid black;
  margin: 0 auto;
  max-width: 70%;
  padding: 2rem 0;
  height: 100%;
`;
