import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const ButtonSpinner = styled.i`
  display: inline-block;
  animation: ${spin} 1s linear infinite;
  border: 2px solid ${({ theme }) => theme.colors.lightShade};
  border-right: 2px solid transparent;
  width: 19px;
  height: 19px;
  border-radius: 50%;
`;
