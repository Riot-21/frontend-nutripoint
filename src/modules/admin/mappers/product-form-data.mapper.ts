import type { ProductFormData } from "../interfaces/product.schema";

export const mapProductToFormData = (product: ProductFormData): FormData => {
  const formData = new FormData();

  formData.append("nombre", product.nombre);
  formData.append("descripcion", product.descripcion);
  formData.append("stock", String(product.stock));
  formData.append("marca", product.marca);
  formData.append("precioUnit", String(product.precioUnit));
  formData.append("modEmpleo", product.modEmpleo);
  formData.append("advert", product.advert);

  product.categorias.forEach((categoria) => {
    formData.append("categorias", categoria);
  });

  product.imagenes?.forEach((img) => {
    formData.append("imagenes", img);
  })

  return formData;
};
