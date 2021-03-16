import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { StorageKeys } from "../types/storage-keys";

type ResponseSuccess<T> = {
  status: number;
  data: T;
  error: never
}

type ResponseError = {
  status: number | undefined;
  data: never;
  error: string;
}

type RefreshAccessTokenResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  }
}

type Response<T> = ResponseSuccess<T> | ResponseError;

type RequestOpts = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  withToken?: boolean;
}

const API_URL = "http://192.168.0.78:8080/api";

export async function executeRequest<T>({
  method = "GET",
  body = undefined,
  withToken = true,
  url
}: RequestOpts): Promise<Response<T>> {
  let config: AxiosRequestConfig = {
    url: `${API_URL}/${url}`,
    method
  };

  if (withToken) {
    const token = localStorage.getItem(StorageKeys.AccessToken);
    config.headers = { "Authorization": `Bearer ${token}` };
  }

  if (body) {
    config.data = body;
  }

  const originalResponse = await callApi<T>(config);
  const statusNotAuthorized = 401;
  if (originalResponse.status !== statusNotAuthorized) {
    return originalResponse;
  }

  const refreshResponse = await callApi<RefreshAccessTokenResponse>({
    url: `${API_URL}/auth/refresh-access-token`,
    method: "POST",
    data: { refreshToken: localStorage.getItem(StorageKeys.RefreshToken) }
  });

  if (refreshResponse.error) {
    return originalResponse;
  }

  const { accessToken, refreshToken } = refreshResponse.data.data;
  localStorage.setItem(StorageKeys.AccessToken, accessToken);
  localStorage.setItem(StorageKeys.RefreshToken, refreshToken);

  return callApi<T>({
    ...config,
    headers: { "Authorization": `Bearer ${accessToken}` }
  });
}

async function callApi<T>(config: AxiosRequestConfig): Promise<Response<T>> {
  try {
    const res: AxiosResponse<T> = await axios(config)
    return {
      status: res.status,
      data: res.data,
      error: null as never
    };
  } catch (error) {
    const err: AxiosError<{ message: string }> = error;
    return {
      status: err.response?.status,
      error: err.response?.data.message ?? err.message,
      data: null as never
    };
  }
}
