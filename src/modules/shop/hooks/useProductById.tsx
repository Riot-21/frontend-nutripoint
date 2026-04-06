import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../actions/get-product-by-id.action"

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ['productById', {id}],
    queryFn: () => getProductById(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id
  })
}
