import React from "react";
import styled, { useTheme } from "styled-components";
import { ArrowRightIcon } from "../icons/arrow-right";
import { PlusIcon } from "../icons/plus";
import { Flex } from "../layout/flex";
import { Title } from "../typography/title";

type Props = {
  listOpen: boolean;
  title: string;
  onAddClick: (e: React.MouseEvent) => void;
} & React.InputHTMLAttributes<HTMLDivElement>

export function SidebarItemContent({ title, onAddClick, listOpen, ...rest }: Props) {
  const theme = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <SidebarItemContentWrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      <Flex>
        <ArrowRightIconWrapper isListOpen={listOpen}>
          <ArrowRightIcon color={theme.colors.darkAccent} />
        </ArrowRightIconWrapper>

        <Title>{title}</Title>
      </Flex>

      {isHovered &&
        <PlusIconWrapper onClick={e => {
          e.stopPropagation();
          onAddClick(e)
        }}>
          <PlusIcon color={theme.colors.darkAccent} />
        </PlusIconWrapper>
      }
    </SidebarItemContentWrapper>
  );
}

const SidebarItemContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .5rem;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.baseAccent};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlusIconWrapper = styled(IconWrapper)`
  :hover {
    path {
      fill: ${({ theme }) => theme.colors.darkShade};
    }
  }
`;

const ArrowRightIconWrapper = styled(IconWrapper)<{ isListOpen: boolean }>`
  margin-right: .5rem;
  svg {
    ${props => props.isListOpen ? "transform: rotate(90deg);" : "transform: rotate(0);"}
    transition: all .2s ease;
  }
`;
