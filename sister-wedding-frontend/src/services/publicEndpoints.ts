import axios from "axios";
import { baseURL } from "./apiInterceptor";

const publicApi = axios.create({
  baseURL,
});

export interface TokenResponse {
  access: string;
  refresh: string;
}

export async function logMeIn(
  username: string,
  password: string
): Promise<TokenResponse> {
  const response = await publicApi.post<TokenResponse>(
    "api/auth/token/",
    {
      username,
      password,
    }
  );

  return response.data;
}