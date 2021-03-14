import { css } from "styled-components";

const margin = {
  values: {
    "8": ".5",
    "16": "1",
    "32": "2",
    "48": "3",
    "64": "4",
  },
  sides: {
    "t": "top",
    "r": "right",
    "b": "bottom",
    "l": "left",
    "x": ["left", "right"],
    "y": ["top", "bottom"]
  }
}

export const marginHelpers = css`
  ${() => {
    let classes = "";

    for (const [px, rem] of Object.entries(margin.values)) {
      for (const [truncated, full] of Object.entries(margin.sides)) {
        if (truncated == "x" || truncated == "y") {
          classes += `.m${truncated}-${px} { margin-${full[0]}: ${rem}rem; margin-${full[1]}: ${rem}rem; }\n`
        } else {
          classes += `.m${truncated}-${px} { margin-${full}: ${rem}rem; }\n`
        }
      }
    }

    return classes;
  }}
`;
