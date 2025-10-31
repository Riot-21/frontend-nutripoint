import { backendApi } from "@/api/nutripointApi";
import type { ProductsResponse } from "@/interfaces/products.interface";

const BASE_URL= import.meta.env.VITE_API_URL;

interface Options {
    sortBy?: string ;
    direction?: validDirections;
    size?: string;
    marca?: string;
    precioMin?: number,
    precioMax?: number,
    query?: string,
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