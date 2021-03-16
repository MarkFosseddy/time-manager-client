import React from "react";
import { useHistory } from "react-router";
import { API } from "../../api/api";
import { routes } from "../../routing/routes";
import { useStoreDispatch } from "../../store";
import { StorageKeys } from "../../types/storage-keys";
import { userActions } from "./user-slice";

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

    dispatch(userActions.login(user))

    history.replace(routes.dashboard.base);
  }

  return { login, isLoading, error };
}

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

    dispatch(userActions.logout());
  }

  return { isLoading, error, logout };
}

export function useAutoLogin() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const dispatch = useStoreDispatch();

  React.useEffect(() => {
    autoLogin();
  }, []);

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
    dispatch(userActions.login(user))
    setIsLoading(false);
  }

  return { isLoading, error, autoLogin };
}
