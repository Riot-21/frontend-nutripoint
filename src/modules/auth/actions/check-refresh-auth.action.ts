import type { AuthResponse } from "../interfaces/auth-response.interface";
import { privateApi } from "@/api/privateApi";

export const checkRefreshAuthAction = async (): Promise<AuthResponse> => {
  const { data } = await privateApi.post<AuthResponse>("/auth/refresh-token");
  return data;
};
