import { createGlobalStyle } from "styled-components";
import { marginHelpers } from "./mixins/margin-helpers";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  html, body, #app {
    height: 100%;
  }

  ul {
    list-style: none;
  }

  ${marginHelpers}
`;
