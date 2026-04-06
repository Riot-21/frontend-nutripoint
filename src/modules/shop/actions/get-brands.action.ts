import { backendApi } from "@/api/nutripointApi"

export const getBrands = async(): Promise<string []> => {
    const { data } = await backendApi.get<string[]>("/marca");
    return data;
}
;