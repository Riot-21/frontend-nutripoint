import axios from "axios";
import type { AuthResponse } from "../interfaces/auth-response.interface";
import {
  loginSchema,
  type LoginForm,
} from "../interfaces/login-schema.interface";
import { publicApi } from "@/api/publicApi";

export const loginAction = async (form: LoginForm): Promise<AuthResponse> => {
  const parsed = loginSchema.safeParse(form);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  try {
    const { data } = await publicApi.post<AuthResponse>(
      "/auth/login",
      parsed.data,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error ?? "Error al iniciar sesión");
    }

    throw new Error("Error inesperado");
  }
};
