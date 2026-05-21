import { z } from "zod";

export const tipoPagoOptions = z.enum([
  "PAYPAL",
  "CREDITO",
  "TRANSFERENCIA",
  "YAPE",
]);

export const purchaseDetailSchema = z.object({
  cantidad: z
    .number()
    .int("La cantidad debe ser entera")
    .positive("La cantidad debe ser mayor a 0"),

  idProducto: z
    .number()
    .int("ID inválido")
    .positive("ID inválido"),
});

export const purchaseSchema = z.object({
  tipoPago: tipoPagoOptions,

  direccion: z
    .string()
    .min(5, "La dirección es obligatoria"),

  distrito: z
    .string()
    .min(2, "El distrito es obligatorio"),

  detalles: z
    .array(purchaseDetailSchema)
    .min(1, "Debe haber al menos un producto"),
});

export type PurchaseRequest = z.infer<typeof purchaseSchema>;
export type PurchaseDetailRequest = z.infer<typeof purchaseDetailSchema>;