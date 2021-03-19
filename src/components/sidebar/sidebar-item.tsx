import React from "react";
import { NavLink } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { routes } from "../../routing/routes";
import { ArrowRightIcon } from "../icons/arrow-right";
import { IconProps } from "../icons/icons-types";
import { PlusIcon } from "../icons/plus";
import { Row } from "../layout/row";
import { Title } from "../typography/title";

type Props = {
  title: string;
  onAddClick: (e: React.MouseEvent) => void;
  list: any[];
}

export function SidebarItem({ title, onAddClick, list }: Props) {
  const theme = useTheme();

  const [listOpen, setListOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPlusIconHovered, setIsPlusIconHovered] = React.useState(false);

  return (
    <div>
      <SidebarItemContentWrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setListOpen(!listOpen)}
      >
        <Row align="center">
          <ArrowRightIconAnimated
            className="mr-8"
            isListOpen={listOpen}
            color={theme.colors.darkAccent}
            size="16"
          />
          <Title>{title}</Title>
        </Row>

        {isHovered &&
          <PlusIcon
            onMouseEnter={() => setIsPlusIconHovered(true)}
            onMouseLeave={() => setIsPlusIconHovered(false)}
            color={isPlusIconHovered ? theme.colors.darkShade : theme.colors.darkAccent}
            size="16"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onAddClick(e);
            }}
          />
        }
      </SidebarItemContentWrapper>

      {listOpen &&
        <ul>
          {list.map(t => (
            <li key={t.id}>
              <StyledNavLink
                to={`${routes.dashboard.taskList}/${t.id}`}
                activeStyle={{
                  backgroundColor: theme.colors.baseAccent,
                  borderRadius: theme.borderRadius
                }}
              >
                {t.title}
              </StyledNavLink>
            </li>
          ))}
        </ul>
      }
    </div>
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

type ArrowRightIconAnimatedProps = { isListOpen: boolean; } & IconProps
const ArrowRightIconAnimated = styled(({
  isListOpen,
  ...rest
}: ArrowRightIconAnimatedProps) => <ArrowRightIcon {...rest} />)`
  ${({ isListOpen }) => isListOpen ? "transform: rotate(90deg);" : "transform: rotate(0);"}
  transition: transform .2s ease;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: .5rem;
  padding-left: 2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.darkShade};

  :hover {
    background-color: ${({ theme }) => theme.colors.baseAccent};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;
