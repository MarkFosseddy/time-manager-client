import React from "react";
import styled from "styled-components";
import { useLogout } from "../../features/user/user-hooks";
import { useAlert } from "../alerts/alerts-hooks";
import { AlertTypes } from "../alerts/alerts-types";
import { LogoutIcon } from "../icons/log-out";
import { Row } from "../layout/row";
import { Paragraph } from "../typography/paragraph";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export function PopUpMenu({ open, setOpen }: Props) {
  const wrapperRef = React.useRef<HTMLUListElement>(null);
  const { error, logout } = useLogout();
  const alert = useAlert();

  React.useEffect(() => {
    if (!open) return;

    function closeMenu(e: MouseEvent) {
      if (!wrapperRef.current || !e.target) return;

      const clickedInsideMenu =
        e.target === wrapperRef.current ||
        wrapperRef.current.contains(e.target as Node);

      if (!clickedInsideMenu) {
        setOpen(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [open]);

  React.useEffect(() => {
    if (error) {
      alert.show({ type: AlertTypes.Error, text: error });
    }
  }, [error]);

  if (!open) return null;

  return (
    <Wrapper ref={wrapperRef}>
      <MenuItem onClick={logout}>
        <Row align="center">
          <LogoutIcon size="16" className="mr-16" />
          <Paragraph>Log out</Paragraph>
        </Row>
      </MenuItem>
    </Wrapper>
  );
}

export const PopUpMenuWrapper = styled.div`
  position: relative;
`;

const Wrapper = styled.ul`
  min-width: 212px;
  max-width: 212px;
  padding: .5rem 0;
  border: 1px solid ${({ theme }) => theme.colors.baseAccent};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.lightShade};
  position: absolute;
  right: 0;
  top: calc(32px + 4px);
`;

const MenuItem = styled.li`
  padding: .5rem 1rem;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.lightAccent};
  }
`;
