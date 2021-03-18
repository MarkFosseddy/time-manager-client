import React from "react";
import { NavLink } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { routes } from "../../routing/routes";
import { ArrowRightIcon } from "../icons/arrow-right";
import { PlusIcon } from "../icons/plus";
import { Flex } from "../layout/flex";
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

  return (
    <div>
      <SidebarItemContentWrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setListOpen(!listOpen)}
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
