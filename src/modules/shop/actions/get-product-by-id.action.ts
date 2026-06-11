import { publicApi } from "@/api/publicApi";
import type { ProductDetailResponse } from "../interfaces/product-detail-response.interface";

export const getProductById = async (id: number): Promise<ProductDetailResponse> => {
  if (!id) throw new Error("Id is required");

  const { data } = await publicApi.get<ProductDetailResponse>(`/productos/detail/${id}`);

  return data;
};
