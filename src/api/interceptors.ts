import { StorageKeys } from "../types/storage-keys";
import { executeRequest, Response } from "./execute-request";

export async function withTokenRefresh<T>(originalRequest: () => Promise<Response<T>>) {
  const origResp = await originalRequest();
  if (origResp.code !== 401) return origResp;

  const refreshTokenResp = await refreshAccessToken();
  if (refreshTokenResp.error) return origResp;

  const { accessToken, refreshToken } = refreshTokenResp.data.data;
  localStorage.setItem(StorageKeys.AccessToken, accessToken);
  localStorage.setItem(StorageKeys.RefreshToken, refreshToken);

  return originalRequest();
};

type RefreshAccessTokenResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  }
}

async function refreshAccessToken() {
  return executeRequest<RefreshAccessTokenResponse>({
    url: "auth/refresh-access-token",
    withToken: false,
    method: "POST",
    body: { refreshToken: localStorage.getItem(StorageKeys.RefreshToken) }
  });
}
