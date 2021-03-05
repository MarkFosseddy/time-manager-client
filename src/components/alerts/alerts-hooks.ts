import { AlertTypes } from "./alerts-types";

import { useStoreDispatch } from "../../store";
import { alertsActions } from "./alerts-slice";

type NewAlert = {
  type: AlertTypes;
  text: string;
}

export function useAlert() {
  const dispatch = useStoreDispatch();

  function show(data: NewAlert) {
    dispatch(alertsActions.add({
      ...data,
      id: Date.now().toString()
    }));
  }

  return { show };
}
