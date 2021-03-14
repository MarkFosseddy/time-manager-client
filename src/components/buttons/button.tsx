import React from "react";
import styled from "styled-components";
import { ButtonSpinner } from "../spinners/button-spinner";


type Props = React.PropsWithChildren<{
  loading?: boolean;
}> & React.ButtonHTMLAttributes<HTMLButtonElement>

export function PrimaryButton({ children, loading = undefined, ...rest }: Props) {
  return (
    <Button {...rest}>
      {loading ? <ButtonSpinner /> : children}
    </Button>
  );
}

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.lightShade};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: .5rem;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  height: 2.188rem;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0.125rem 0.188rem ${({ theme }) => theme.colors.shadow};
  }
`;
