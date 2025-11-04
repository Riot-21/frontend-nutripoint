import { backendApi } from "@/api/nutripointApi";
import type { ProductsResponse } from "@/interfaces/products.interface";

interface Options {
    sortBy?: string | null;
    direction?: validDirections;
    size?: number;
    marca?: string | null;
    precioMin?: number | null,
    precioMax?: number | null,
    query?: string | null,
    page?: number
}

type validDirections = 'asc' | 'desc';

export const getProductsAction = async (options: Options):Promise<ProductsResponse> => {

    const { query, direction, marca, page, precioMax, precioMin, size, sortBy } = options

    const { data } = await backendApi.get<ProductsResponse>('/productos', {
        params: {
            query,
            direction, 
            marca, 
            page,
            precioMax,
            precioMin,
            size,
            sortBy
        }
    });

    return data;
}