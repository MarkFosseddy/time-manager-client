import { executeRequest } from "./execute-request";

type User = {
  id: string;
  username: string;
}

type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    user: User
  }
}

type LoginBody = {
  username: string;
  password: string;
}

async function login(body: LoginBody) {
  return executeRequest<LoginResponse>({
    url: "auth/login",
    withToken: false,
    method: "POST",
    body
  });
}

async function logout() {
  return executeRequest({
    url: "auth/logout",
    method: "POST"
  });
}

type GetUserSuccess = {
  data: {
    user: User;
  }
}

async function getUser() {
  return executeRequest<GetUserSuccess>({
    url: "auth/me",
    method: "POST"
  });
}

export const auth = {
  login,
  logout,
  getUser
};
