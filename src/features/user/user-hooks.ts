import React from "react";
import { API } from "../../api";
import { useStoreDispatch } from "../../store";
import { StorageKeys } from "../../types/storage-keys";
import { userActions } from "./user-slice";

export function useLogin() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const dispatch = useStoreDispatch();

  async function login(username: string, password: string) {
    setError(null);

    setIsLoading(true);
    const res = await API.auth.login({ username, password });
    setIsLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    const { accessToken, refreshToken, user } = res.data.data;
    localStorage.setItem(StorageKeys.AccessToken, accessToken);
    localStorage.setItem(StorageKeys.RefreshToken, refreshToken);
    dispatch(userActions.login(user))

    setIsLoggedIn(true);
  }

  return { login, isLoading, error, isLoggedIn };
}
