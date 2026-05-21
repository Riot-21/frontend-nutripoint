import { publicApi } from "@/api/publicApi";
import type { CategoriesResponse } from "@/interfaces/products-response.interface"

export const getCategories = async(): Promise<CategoriesResponse[]> => {
    const { data } = await publicApi.get<CategoriesResponse[]>("/category");
    return data;
}