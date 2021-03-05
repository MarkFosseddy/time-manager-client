import React from "react";
import styled from "styled-components";

import { PlusIcon, PlusFilledIcon } from "../icons/plus";

type Props = React.PropsWithChildren<{}> & React.HtmlHTMLAttributes<HTMLDivElement>

export function AddButton({ children, ...rest }: Props) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Wrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      <IconWrapper>
        {isHovered ? <PlusFilledIcon /> : <PlusIcon />}
      </IconWrapper>

      <Button>
        {children}
      </Button>
    </Wrapper>
  );
}

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-right: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: transparent;
  cursor: pointer;

  ${Button} {
    color: ${({ theme }) => theme.colors.darkAccent};
  }

  &:hover {
    ${Button} {
      color: ${({ theme }) => theme.colors.main};
    }
  }
`;
