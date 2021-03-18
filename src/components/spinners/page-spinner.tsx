import React from "react";
import styled, { keyframes } from "styled-components";
import { Page } from "../layout/page";

export function PageSpinner() {
  return (
    <PageSpinnerWrapper>
      <PageSpinnerIcon />
    </PageSpinnerWrapper>
  );
}

const PageSpinnerWrapper = styled(Page)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const PageSpinnerIcon = styled.div`
  animation: ${spin} 1s linear infinite;
  border: 4px solid ${({ theme }) => theme.colors.main};
  border-right: 4px solid transparent;
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;
