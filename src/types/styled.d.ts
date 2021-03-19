import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    header: string;

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
      },

      alpha: {
        20: string;
        40: string;
      }
    }
  }
}
