import React from "react"
import { ThemeProvider } from "styled-components";
import { AlertsContainer } from "./features/alerts/alerts-container";
import { AppRoutes } from "./routing/app-routes";
import { GlobalStyles } from "./styling/global-styles";
import { lightTheme } from "./styling/light-theme";

export function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <AppRoutes />
      <AlertsContainer />
    </ThemeProvider>
  );
}
