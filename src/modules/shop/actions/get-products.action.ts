import { backendApi } from "@/api/nutripointApi";
import type { ProductsResponse } from "@/interfaces/products-response.interface";

interface Options {
  sortBy?: string | null;
  direction?: validDirections;
  size?: number;
  marcas?: string[] | null;
  precioMin?: number | null;
  precioMax?: number | null;
  query?: string | null;
  page?: number;
  categorias?: string[] | null;
}

type validDirections = "asc" | "desc";

export const getProductsAction = async (
  options: Options
): Promise<ProductsResponse> => {
  const { query, direction, marcas, page, precioMax, precioMin, size, sortBy, categorias } =
    options;

  const { data } = await backendApi.get<ProductsResponse>("/productos", {
    params: {
      query,
      direction,
      marcas,
      categorias,
      page,
      precioMax,
      precioMin,
      size,
      sortBy,
    }
  });

  return data;
};
