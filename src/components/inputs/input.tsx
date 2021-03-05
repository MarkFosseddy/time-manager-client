import React from "react";
import styled from "styled-components";

import { Title } from "../typography/title";

type Props = {
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>

export function Input({ label, type = "text", ...rest }: Props) {
  return (
    <InputWrapper>
      <Title
        as="label"
        htmlFor={label}
        className="mb-8"
      >
        {label}
      </Title>

      <InputBase id={label} type={type} {...rest} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputBase = styled.input`
  font-size: 1rem;
  padding: .5rem;
  outline: none;
  background-color: ${({ theme }) => theme.colors.lightShade};
  border: 1px solid ${({ theme }) => theme.colors.baseAccent};
  border-radius: ${({ theme }) => theme.borderRadius};

  &:focus {
    border-color: ${({ theme }) => theme.colors.darkShade};
  }
`;
