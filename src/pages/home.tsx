import React from "react";
import { useAlert } from "../components/alerts/alerts-hooks";
import { AlertTypes } from "../components/alerts/alerts-types";
import { PrimaryButton } from "../components/buttons/button";
import { Page } from "../components/layout/page";
import { Header } from "../components/typography/header";
import { useLogout } from "../features/user/user-hooks";

export function Home() {
  const { isLoading, error, logout } = useLogout();
  const alert = useAlert();

  React.useEffect(() => {
    if (error) {
      alert.show({ type: AlertTypes.Error, text: error });
    }
  }, [error]);

  return (
    <Page>
      <Header>Home Page</Header>

      <PrimaryButton
        onClick={() => logout()}
        loading={isLoading}
      >
        Log out
      </PrimaryButton>
    </Page>
  );
}
