import styled from "styled-components";

type Props = {
  column?: boolean;
}

export const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${({ column = false}) => column ? "column" : "row" };
`;
