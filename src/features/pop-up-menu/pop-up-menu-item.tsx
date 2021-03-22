import styled from "styled-components";

export const PopUpMenuItem = styled.li`
  padding: .5rem 1rem;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.lightAccent};
  }
`;
