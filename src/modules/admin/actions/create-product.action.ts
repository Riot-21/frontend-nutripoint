import type { ProductInterface } from "@/modules/shop/interfaces/products-response.interface";
import type { ProductFormData } from "../interfaces/product.schema";
import { privateApi } from "@/api/privateApi";
import { mapProductToFormData } from "../mappers/product-form-data.mapper";

export const createProductAction = async (
  datos: ProductFormData,
): Promise<ProductInterface> => {
  try {
    const formData = mapProductToFormData(datos);
    const { data } = await privateApi.post<ProductInterface>(
      "/productos",
      formData,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error backend");
  }
};
