import React from "react";
import styled from "styled-components";
import { Paragraph } from "../../components/typography/paragraph";
import { useStoreSelector } from "../../store";
import { authSelectors } from "../auth/auth-slice";
import { HeaderIconWrapper } from "./header-icon-wrapper";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function UserAvatar(props: Props) {
  const user = useStoreSelector(authSelectors.selectUser);
  const userInitial = user.username.slice(0, 1).toUpperCase();

  return (
    <UserAvatarWrapper {...props}>
      <UserInitial>
        {userInitial}
      </UserInitial>
    </UserAvatarWrapper>
  );
}

const UserAvatarWrapper = styled(HeaderIconWrapper)`
  border-radius: 50%;
`;

const UserInitial = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.lightShade};
  font-weight: bold;
`;
