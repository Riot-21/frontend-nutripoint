import { publicApi } from "@/api/publicApi";
import type { ProductInterface } from "@/interfaces/products-response.interface";

export const getProductById = async (id: number): Promise<ProductInterface> => {
  if (!id) throw new Error("Id is required");

  const { data } = await publicApi.get<ProductInterface>(`/productos/${id}`);

  return data;
};
