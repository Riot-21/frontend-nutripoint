import axios from "axios";
import type { MessageResponse, ResetForm } from "../interfaces/auth-schema.interface";
import { publicApi } from "@/api/publicApi";

type ResetPasswordParams = ResetForm & {
  email: string;
};

export const resetPasswordAction = async (params: ResetPasswordParams) => {
  try {
    const { data } = await publicApi.post<MessageResponse>(
      "/auth/reset-password",
      params,
    );
    return data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error ?? "Error al restablecer la contraseña");
    }

    throw new Error("Error inesperado");
  }
};
