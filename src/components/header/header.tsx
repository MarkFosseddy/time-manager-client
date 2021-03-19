import React from "react";
import { NavLink } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { userSelectors } from "../../features/user/user-slice";
import { routes } from "../../routing/routes";
import { useStoreDispatch, useStoreSelector } from "../../store";
import { HomeIcon } from "../icons/home";
import { MenuIcon } from "../icons/menu";
import { Row } from "../layout/row";
import { PopUpMenu, PopUpMenuWrapper } from "../pop-up-menu/pop-up-menu";
import { sidebarActions, sidebarSelectors } from "../sidebar/sidebar-slice";
import { Paragraph } from "../typography/paragraph";

export function Header() {
  const theme = useTheme();
  const dispatch = useStoreDispatch();

  const isSidebarOpen = useStoreSelector(sidebarSelectors.selectIsOpen);
  const user = useStoreSelector(userSelectors.selectUser);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const userInitial = user.username.slice(0, 1).toUpperCase();

  return (
    <HeaderWrapper>
      <Row align="center">
        <IconWrapper
          className="mr-16"
          onClick={() => dispatch(sidebarActions.setIsOpen(!isSidebarOpen))}
        >
          <MenuIcon color={theme.colors.lightShade} />
        </IconWrapper>

        <NavLink to={routes.dashboard.base}>
          <IconWrapper>
            <HomeIcon color={theme.colors.lightShade} />
          </IconWrapper>
        </NavLink>
      </Row>

      <PopUpMenuWrapper>
        <UserAvatar onClick={() => setIsMenuOpen(true)}>
          <UserInitial>
            {userInitial}
          </UserInitial>
        </UserAvatar>
        <PopUpMenu
          open={isMenuOpen}
          setOpen={setIsMenuOpen}
        />
      </PopUpMenuWrapper>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  height: ${({ theme }) => theme.header};
  background-color: ${({ theme }) => theme.colors.main};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme: { colors } }) => colors.lightShade + colors.alpha[20]};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;

  :hover {
    background-color: ${({ theme: { colors } }) => colors.lightShade + colors.alpha[40]};
  }
`;

const UserAvatar = styled(IconWrapper)`
  border-radius: 50%;
`;

const UserInitial = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.lightShade};
  font-weight: bold;
`;
