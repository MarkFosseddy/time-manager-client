import axios, { AxiosError } from "axios";

type LoginBody = {
  username: string;
  password: string;
}

type LoginSuccess = {
  status: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      username: string;
    }
  }
}

type ResponseSuccess<T> = {
  data: T;
  error: never
}
type ResponseError = {
  data: never;
  error: string
}

async function login(body: LoginBody) {
  try {
    const res = await axios.post(
      "http://192.168.0.78:8080/api/auth/login",
      body
    );

    return { data: res.data } as ResponseSuccess<LoginSuccess>
  } catch (err) {
    return { error: getErrorMessage(err) } as ResponseError
  }
}

function getErrorMessage(error: AxiosError): string {
  return error.response?.data.message ?? error.message;
}

export const auth = { login };
