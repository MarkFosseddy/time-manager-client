import React from "react";
import { AlertError } from "./alert-error";
import { AlertProps, AlertTypes } from "./alerts-types";

export function AlertFactory({ data }: AlertProps) {
  switch (data.type) {
    case AlertTypes.Error:
      return <AlertError data={data} />;

    default:
      return null;
  }
}
