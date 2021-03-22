import React from "react";
import { ThemeContext } from "styled-components";
import { ErrorAlertIcon } from "../../components/icons/error-alert";
import { AlertBase } from "./alert-base";
import { AlertProps } from "./alerts-types";

export function AlertError({ data }: AlertProps) {
  const theme = React.useContext(ThemeContext);

  return (
    <AlertBase
      title="Error"
      id={data.id}
      text={data.text}
      color={theme.colors.alerts.error}
      icon={<ErrorAlertIcon />}
    />
  );
}
