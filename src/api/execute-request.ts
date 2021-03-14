import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { StorageKeys } from "../types/storage-keys";
import { withTokenRefresh } from "./interceptors";

export type Response<T> = ResponseSuccess<T> | ResponseError;

type ResponseSuccess<T> = {
  code: number;
  data: T;
  error: never
}

type ResponseError = {
  code: number | undefined;
  data: never;
  error: string;
}

type RequestOpts = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  withToken?: boolean;
}

export async function executeRequest<T>({
  method = "GET",
  body = undefined,
  withToken = true,
  url
}: RequestOpts) {
  if (withToken) {
    return withTokenRefresh(() => makeRequest<T>({ method, body, withToken, url }));
  }

  return makeRequest<T>({ method, body, withToken, url });
}

async function makeRequest<T>({ method, body, withToken, url }: RequestOpts): Promise<Response<T>> {
  let config: AxiosRequestConfig = {
    url: `http://192.168.0.78:8080/api/${url}`,
    method
  };

  if (withToken) {
    const token = localStorage.getItem(StorageKeys.AccessToken);
    config.headers = { "Authorization": `Bearer ${token}` };
  }

  if (body) {
    config.data = body;
  }

  try {
    const res: AxiosResponse<T> = await axios(config);
    return { code: res.status, data: res.data, error: null as never };
  } catch (error) {
    const err: AxiosError<{ message: string }> = error;
    return {
      code: err.response?.status,
      error: err.response?.data.message ?? err.message,
      data: null as never
    };
  }
}
