import { z } from "zod";

export const productSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  stock: z.number("Numero obligatorio").int("El numero debe ser entero").min(1, "El stock debe ser mayor a 0"),
  marca: z.string().min(1, "Debe seleccionar una marca"),
  precioUnit: z
  .number("Precio obligatorio")
  .positive("El precio debe ser mayor a 0")
  .refine(
    (value)=> {
      const decimals = value.toString().split('.')[1];

      return !decimals || decimals.length <= 2;
    },
    {error: "Máximo 2 decimales"}
  ),
  modEmpleo: z.string().min(1, "El modo de empleo es obligatorio"),
  advert: z.string().min(1, "Las advertencias son obligatorias"),
  categorias: z
    .array(z.string())
    .min(1, "Debe haber al menos una categoría"),
  imagenes: z.array(z.instanceof(File)).max(3, "Máximo 3 imágenes").optional(),
});

// export const editProductSchema = productSchema.partial();

export type ProductFormData = z.infer<typeof productSchema>;
// export type EditProductFormData = z.infer<typeof editProductSchema>

