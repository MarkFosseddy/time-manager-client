import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AlertsContainer } from "./components/alerts";
import { AppRoutes } from "./routing/app-routes";
import { store } from "./store";
import { lightTheme } from "./styling/light-theme";

export function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={lightTheme}>
          <AppRoutes />
          <AlertsContainer />
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
}
