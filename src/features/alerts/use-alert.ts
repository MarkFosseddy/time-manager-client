import { useStoreDispatch } from "../../store";
import { alertsActions } from "./alerts-slice";
import { AlertTypes } from "./alerts-types";

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
