import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      lightShade: string;
      darkShade: string;
      lightAccent: string;
      baseAccent: string;
      darkAccent: string;
      shadow: string;

      alerts: {
        error: string;
      }
    }
  }
}
