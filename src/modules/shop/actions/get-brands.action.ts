import { publicApi } from "@/api/publicApi";

export const getBrands = async(): Promise<string []> => {
    const { data } = await publicApi.get<string[]>("/marca");
    return data;
}
;