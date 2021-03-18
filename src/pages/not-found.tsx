import React from "react";
import { Page } from "../components/layout/page";
import { Heading } from "../components/typography/heading";

export function NotFound() {
  return (
    <Page>
      <Heading>
        404 Not Found :(
      </Heading>
    </Page>
  );
}