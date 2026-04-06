import axios from "axios";
import { backendApi } from "@/api/nutripointApi";
import type { AuthResponse } from "../interfaces/auth-response.interface";
import {
  registerSchema,
  type RegisterForm,
} from "../interfaces/register-schema.interface";

export const registerAction = async (
  form: RegisterForm,
): Promise<AuthResponse> => {
  const parsed = registerSchema.safeParse(form);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  try {
    const { data } = await backendApi.post<AuthResponse>(
      "/auth/register",
      parsed.data,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error ?? "Error al registrar");
    }

    throw new Error("Error inesperado");
  }
};
