import styled from "styled-components";

export const Row = styled.div<{
  align?: "center" | "stretch" | "start" | "end";
  justify?: "start"| "center" | "space-between" | "space-around" | "space-evenly";
}>`
  display: flex;
  align-items: ${({ align = "start" }) => align};
  justify-content: ${({ justify = "start" }) => justify};
`;
