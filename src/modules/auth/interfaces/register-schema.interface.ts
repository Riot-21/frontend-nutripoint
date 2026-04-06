import { z } from "zod";

const numericString = (len: number, field: string) =>
  z
    .string()
    .trim()
    .nonempty(`El ${field} es requerido`)
    .regex(/^\d+$/, `El ${field} solo debe contener números`)
    .length(len, `El ${field} debe tener ${len} dígitos`);

export const passwordSchema = z
  .string()
  .trim()
  .nonempty("La contraseña es requerida")
  .min(8, "Mínimo 8 caracteres")
  .max(64, "Máximo 64 caracteres")
  .regex(/[a-z]/, "Debe tener una minúscula")
  .regex(/[A-Z]/, "Debe tener una mayúscula")
  .regex(/\d/, "Debe tener un número")
  .regex(/[@$!%*?&]/, "Debe tener un símbolo (@$!%*?&)")
  .regex(
    /^[A-Za-z\d@$!%*?&]+$/,
    "Contiene caracteres no permitidos (incluida la 'ñ').",
  );

export const registerSchema = z.object({
  email: z.email("Correo inválido").nonempty("El correo es requerido"),

  password: passwordSchema,

  nombres: z
    .string()
    .trim()
    .nonempty("Los nombres son requeridos")
    .min(3, "Muy corto"),

  apellidos: z
    .string()
    .trim()
    .nonempty("Los apellidos son requeridos")
    .min(4, "Muy corto"),

  telefono: numericString(9, "telefono"),
  dni: numericString(8, "dni"),
});

export type RegisterForm = z.infer<typeof registerSchema>;
