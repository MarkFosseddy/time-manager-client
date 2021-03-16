import styled from "styled-components";

export const Paragraph = styled.p<{ bold?: boolean }>`
  color: ${({ theme }) => theme.colors.darkShade};
  font-size: 1rem;
`;
