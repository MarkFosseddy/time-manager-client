import React from "react";
import { ThemeProvider } from "styled-components";
import { AlertsContainer } from "./components/alerts/alerts-components";
import { useAlert } from "./components/alerts/alerts-hooks";
import { AlertTypes } from "./components/alerts/alerts-types";
import { useAutoLogin } from "./features/user/user-hooks";
import { AppRoutes } from "./routing/app-routes";
import { GlobalStyles } from "./styling/global-styles";
import { lightTheme } from "./styling/light-theme";

export function App() {
  const { isLoading, error } = useAutoLogin();
  const alert = useAlert();

  React.useEffect(() => {
    if (error) {
      alert.show({ type: AlertTypes.Error, text: error });
    }
  }, [error]);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      {isLoading
        ? <Spinner />
        : <AppRoutes />
      }
      <AlertsContainer />
    </ThemeProvider>
  );
}

function Spinner() {
  return (
    <div style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1>LOADING...</h1>
    </div>
  );
}
