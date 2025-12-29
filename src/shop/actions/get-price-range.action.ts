import { backendApi } from "@/api/nutripointApi"

interface PriceRange {
    min: number,
    max:number
}

export const getPriceRange = async():Promise<PriceRange> => {
    const { data } = await backendApi.get<PriceRange>("/productos/price-range")
    return data
}