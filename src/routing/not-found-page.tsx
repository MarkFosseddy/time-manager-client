import React from "react";
import { Page } from "../components/layout/page";
import { Header } from "../components/typography/header";

export function NotFoundPage() {
  return (
    <Page>
      <Header>
        404 Not Found :(
      </Header>
    </Page>
  );
}