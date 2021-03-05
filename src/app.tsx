import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { lightTheme } from "./styling/light-theme";
import { store } from "./store";

import { AppRoutes } from "./routing/app-routes";
import { AlertsContainer } from "./components/alerts";

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
