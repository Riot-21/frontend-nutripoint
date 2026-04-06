import z from "zod";
import { passwordSchema } from "./register-schema.interface";

export const forgotSchema = z.object({
  email: z.email("Correo inválido"),
});
export type ForgotForm = z.infer<typeof forgotSchema>;


export const resetSchema = z.object({
    code: z.string().length(6, "Código debe tener 6 dígitos"),
    newPassword: passwordSchema,
});
export type ResetForm = z.infer<typeof resetSchema>;

//Tipo de respuesta de los metodos
export type MessageResponse = {
  message: string;
};