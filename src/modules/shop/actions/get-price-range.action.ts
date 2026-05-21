import { publicApi } from "@/api/publicApi"

interface PriceRange {
    min: number,
    max:number
}

export const getPriceRange = async():Promise<PriceRange> => {
    const { data } = await publicApi.get<PriceRange>("/productos/price-range")
    return data
}