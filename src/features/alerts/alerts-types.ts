export enum AlertTypes {
  Error
}

export type Alert = {
  id: string;
  type: AlertTypes;
  text: string;
}

export type AlertProps = {
  data: Alert;
}
