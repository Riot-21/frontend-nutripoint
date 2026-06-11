import type { ProductInterface } from "@/modules/shop/interfaces/products-response.interface";
import type { ProductFormData } from "../interfaces/product.schema";
import { privateApi } from "@/api/privateApi";
import { mapProductToFormData } from "../mappers/product-form-data.mapper";

type updateProductPayload = {
  id: number;
  datos: ProductFormData;
};

export const updateProductAction = async ({
  id,
  datos,
}: updateProductPayload): Promise<ProductInterface> => {
  try {
    const formData = mapProductToFormData(datos);
    const { data } = await privateApi.patch<ProductInterface>(
      `/productos/${id}`,
      formData,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Error backend");
  }
};
