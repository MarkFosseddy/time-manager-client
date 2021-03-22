import React from "react";
import { LogoutIcon } from "../../components/icons/log-out";
import { Row } from "../../components/layout/row";
import { Paragraph } from "../../components/typography/paragraph";
import { AlertTypes } from "../alerts/alerts-types";
import { useAlert } from "../alerts/use-alert";
import { useLogout } from "../auth/use-logout";
import { PopUpMenu, PopUpMenuProps } from "../pop-up-menu/pop-up-menu";
import { PopUpMenuItem } from "../pop-up-menu/pop-up-menu-item";

export function UserSettingsPopUpMenu({ isOpen, setIsOpen }: PopUpMenuProps) {
  const { error, logout } = useLogout();
  const alert = useAlert();

  React.useEffect(() => {
    if (error) {
      alert.show({ type: AlertTypes.Error, text: error });
    }
  }, [error]);

  return (
    <PopUpMenu isOpen={isOpen} setIsOpen={setIsOpen}>
      <PopUpMenuItem onClick={logout}>
        <Row align="center">
          <LogoutIcon size="16" className="mr-16" />
          <Paragraph>Log out</Paragraph>
        </Row>
      </PopUpMenuItem>
    </PopUpMenu>
  );
}
