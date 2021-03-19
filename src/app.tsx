import React from "react";
import { ThemeProvider } from "styled-components";
import { AlertsContainer } from "./components/alerts/alerts-components";
import { useAlert } from "./components/alerts/alerts-hooks";
import { AlertTypes } from "./components/alerts/alerts-types";
import { PageSpinner } from "./components/spinners/page-spinner";
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
        ? <PageSpinner />
        : <AppRoutes />
      }
      <AlertsContainer />
    </ThemeProvider>
  );
}
