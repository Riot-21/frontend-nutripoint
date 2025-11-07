import { backendApi } from "@/api/nutripointApi";
import type { ProductInterface } from "@/interfaces/products.interface";

export const getProductById = async(id: number):Promise<ProductInterface> => {

    if(!id) throw new Error('Id is required');

    const { data } = await backendApi.get<ProductInterface>(`/productos/${id}`);

    return data
}