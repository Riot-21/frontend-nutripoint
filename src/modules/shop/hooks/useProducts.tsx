import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";
import { useSearchParams } from "react-router";

type HookOptions = {
  queryInput?: string;
};

type UseProductsOptions = HookOptions &
  Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getProductsAction>>>,
    "queryKey" | "queryFn"
  >;

const parsePage = (v: string | null) => {
  const n = Number(v);
  return Number.isNaN(n) || n < 0 ? 0 : n;
};

const parseSize = (v: string | null) => {
  const n = Number(v);
  return Number.isNaN(n) || n <= 0 ? 10 : n;
};

const parseNumber = (v: string | null) => {
  if (v === null || v.trim() === "") return null;
  const n = Number(v);
  return Number.isNaN(n) || n <= 0 ? null : n;
};

export const useProducts = (options?: UseProductsOptions) => {
  const { queryInput, ...queryOptions } = options ?? {};
  const [searchParams] = useSearchParams();

  const size = searchParams.get("size") ?? "10";
  const page = searchParams.get("page") ?? "0";
  const marcas = searchParams.getAll("marcas") || null;
  const categorias = searchParams.getAll("categorias") || null;
  const query = queryInput ?? searchParams.get("query");
  const sortBy = searchParams.get("sortBy");
  const direction = (searchParams.get("direction") as "asc" | "desc") || "asc";
  const precioMin = searchParams.get("precioMin");
  const precioMax = searchParams.get("precioMax");

  return useQuery({
    queryKey: [
      "products",
      {
        size,
        page,
        marcas,
        categorias,
        query,
        sortBy,
        direction,
        precioMax,
        precioMin,
      },
    ],
    queryFn: () =>
      getProductsAction({
        // size: isNaN(+size) ? 10 : +size,
        // page: isNaN(+page) ? 0 : +page,
        size: parseSize(size),
        page: parsePage(page),
        marcas,
        categorias,
        query,
        sortBy,
        direction,
        precioMin: parseNumber(precioMin),
        precioMax: parseNumber(precioMax),
        // precioMin: precioMin && !isNaN(+precioMin) ? +precioMin : null,
        // precioMax: precioMax && !isNaN(+precioMax) ? +precioMax : null,
      }),
    staleTime: 1000 * 60 * 5,
    ...queryOptions,
  });
};
