import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";
import { useSearchParams } from "react-router";

interface Options{
    enabled?: boolean,
    retry?: boolean,
    queryInput?: string,
}

export const useProducts = (
    options?: Options,
) => {

    const [ searchParams ] = useSearchParams();

    const size = searchParams.get('size') || 10;
    const page = searchParams.get('page') || 0;
    const marcas = searchParams.getAll('marcas') || null;
    const query = options?.queryInput || searchParams.get('query') || null;
    const sortBy = searchParams.get('sortBy') || null;
    const direction = (searchParams.get('direction') as 'asc' | 'desc') || 'asc';
    const precioMin = searchParams.get('precioMin') || null;
    const precioMax = searchParams.get('precioMax') || null;
    const categorias = searchParams.getAll('categorias') || null;

  return useQuery({
    queryKey: ["products", {size, page, marcas, categorias, query, sortBy, direction, precioMax, precioMin}],
    queryFn: () => getProductsAction({
        size: isNaN(+size) ? 10 : +size,
        page: isNaN(+page) ? 0 : +page,
        marcas,
        categorias,
        query,
        sortBy,
        direction,
        precioMin: precioMin && !isNaN(+precioMin) ? +precioMin : null,
        precioMax: precioMax && !isNaN(+precioMax) ? +precioMax : null,

    }),
    staleTime: 1000 * 60 * 5,
    ...options
  });
};
