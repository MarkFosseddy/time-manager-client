import React from "react";
import { useStoreDispatch } from "../../store";
import { authActions } from "./auth-slice";
import { API } from "../../api/api";
import { StorageKeys } from "../../types/storage-keys";

export function useLogout() {
  const dispatch = useStoreDispatch();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function logout() {
    setError(null);

    setIsLoading(true);
    const { error } = await API.auth.logout();

    if (error) {
      setError(error);
      setIsLoading(false);
      return;
    }

    localStorage.removeItem(StorageKeys.AccessToken);
    localStorage.removeItem(StorageKeys.RefreshToken);
    setIsLoading(false);

    dispatch(authActions.logout());
  }

  return { isLoading, error, logout };
}
