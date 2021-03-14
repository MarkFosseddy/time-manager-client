import React from "react";
import styled from "styled-components";
import { useLogout } from "../features/user/user-hooks";
import { userSelectors } from "../features/user/user-slice";
import { useStoreSelector } from "../store";
import { useAlert } from "./alerts/alerts-hooks";
import { AlertTypes } from "./alerts/alerts-types";
import { ButtonSpinner } from "./spinners/button-spinner";
import { Paragraph } from "./typography/paragraph";

type Props = {};

export function Navbar({ }: Props) {
  const { error, isLoading, logout } = useLogout();
  const alert = useAlert();
  const user = useStoreSelector(userSelectors.selectUser);
  const initial = user.username.slice(0, 1).toUpperCase();

  React.useEffect(() => {
    if (error) {
      alert.show({ type: AlertTypes.Error, text: error });
    }
  }, [error]);

  return (
    <StyledNav>
      <LogoutButton onClick={async () => await logout()}>
        {isLoading ? <ButtonSpinner /> : "Log out"}
      </LogoutButton>
      <UserAvatar>
        <Paragraph>{initial}</Paragraph>
      </UserAvatar>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  height: 54px;
  background-color: ${({ theme }) => theme.colors.main};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 40px;
  color: ${({ theme }) => theme.colors.lightShade};
`;

const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.lightShade};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const LogoutButton = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.lightShade};
  cursor: pointer;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
`;
