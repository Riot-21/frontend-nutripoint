import axios from "axios";
import type { AuthResponse } from "../interfaces/auth-response.interface";
import {
  registerSchema,
  type RegisterForm,
} from "../interfaces/register-schema.interface";
import { publicApi } from "@/api/publicApi";

export const registerAction = async (
  form: RegisterForm,
): Promise<AuthResponse> => {
  const parsed = registerSchema.safeParse(form);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  try {
    const { data } = await publicApi.post<AuthResponse>(
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
