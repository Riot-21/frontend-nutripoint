import { backendApi } from "@/api/nutripointApi"
import type { CategoriesResponse } from "@/interfaces/products-response.interface"

export const getCategories = async(): Promise<CategoriesResponse[]> => {
    const { data } = await backendApi.get<CategoriesResponse[]>("/category");
    return data;
}