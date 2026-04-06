import axios from "axios";
import { backendApi } from "@/api/nutripointApi";
import type { AuthResponse } from "../interfaces/auth-response.interface";

export const googleAuthAction = async (
  token: string,
  mode: "login" | "register",
): Promise<AuthResponse> => {
  try {
    const endpoint =
      mode == "login" ? "/auth/google-login" : "/auth/google-register";

    const { data } = await backendApi.post<AuthResponse>(endpoint, { token });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // const data = error.response?.data as any;
      // const message = data?.error || data?.message || "Error autenticando con google"
      throw new Error(
        error.response?.data?.error ?? "Error autenticando con Google",
      );
      // throw new Error(message);
    }

    throw new Error("Error inesperado");
  }
};
