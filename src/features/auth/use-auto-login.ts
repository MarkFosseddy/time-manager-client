import React from "react";
import { useStoreDispatch } from "../../store";
import { authActions } from "./auth-slice";
import { API } from "../../api/api";
import { StorageKeys } from "../../types/storage-keys";

export function useAutoLogin() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const dispatch = useStoreDispatch();

  async function autoLogin() {
    if (!localStorage.getItem(StorageKeys.AccessToken)) {
      setIsLoading(false);
      return;
    }

    const res = await API.auth.getUser();
    if (res.error) {
      setError(res.error);
      setIsLoading(false);
      return;
    }

    const { user } = res.data.data;
    dispatch(authActions.login(user))
    setIsLoading(false);
  }

  return { isLoading, error, autoLogin };
}
