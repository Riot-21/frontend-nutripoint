import { backendApi } from "@/api/nutripointApi";
import axios from "axios";
import type { ForgotForm, MessageResponse } from "../interfaces/auth-schema.interface";

export const forgotPasswordAction = async (form: ForgotForm) => {
  try {
    const { data } = await backendApi.post<MessageResponse>(
      "/auth/recover-password",
      form,
    );
    return data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error ?? "Error al enviar código");
    }

    throw new Error("Error inesperado");
  }
};
