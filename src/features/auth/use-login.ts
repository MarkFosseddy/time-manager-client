import React from "react";
import { useStoreDispatch } from "../../store";
import { authActions } from "./auth-slice";
import { useHistory } from "react-router-dom";
import { API } from "../../api/api";
import { StorageKeys } from "../../types/storage-keys";
import { routes } from "../../routing/routes";

export function useLogin() {
  const dispatch = useStoreDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function login(username: string, password: string) {
    setError(null);

    setIsLoading(true);
    const res = await API.auth.login({ username, password });

    if (res.error) {
      setError(res.error);
      setIsLoading(false);
      return;
    }

    const { accessToken, refreshToken, user } = res.data.data;
    localStorage.setItem(StorageKeys.AccessToken, accessToken);
    localStorage.setItem(StorageKeys.RefreshToken, refreshToken);
    setIsLoading(false);

    dispatch(authActions.login(user))

    history.replace(routes.dashboard.base);
  }

  return { login, isLoading, error };
}

