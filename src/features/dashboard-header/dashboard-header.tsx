import React from "react";
import { NavLink } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { routes } from "../../routing/routes";
import { useStoreDispatch } from "../../store";
import { HomeIcon } from "../../components/icons/home";
import { MenuIcon } from "../../components/icons/menu";
import { Row } from "../../components/layout/row";
import { sidebarActions } from "../../components/sidebar/sidebar-slice";
import { UserAvatar } from "./user-avatar";
import { HeaderIconWrapper } from "./header-icon-wrapper";
import { UserSettingsPopUpMenu } from "./user-settings-pop-up-menu";
import { PopUpMenuContainer } from "../pop-up-menu/pop-up-menu-container";
import { usePopUpMenu } from "../pop-up-menu/use-pop-up-menu";

export function DashboardHeader() {
  const theme = useTheme();
  const dispatch = useStoreDispatch();

  const menu = usePopUpMenu();

  return (
    <HeaderWrapper>
      <Row align="center">
        <HeaderIconWrapper
          className="mr-16"
          onClick={() => dispatch(sidebarActions.toggle())}
        >
          <MenuIcon color={theme.colors.lightShade} />
        </HeaderIconWrapper>

        <NavLink to={routes.dashboard.base}>
          <HeaderIconWrapper>
            <HomeIcon color={theme.colors.lightShade} />
          </HeaderIconWrapper>
        </NavLink>
      </Row>

      <PopUpMenuContainer>
        <UserAvatar onClick={menu.toggle} />
        <UserSettingsPopUpMenu
          isOpen={menu.isOpen}
          setIsOpen={menu.setIsOpen}
        />
      </PopUpMenuContainer>
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
