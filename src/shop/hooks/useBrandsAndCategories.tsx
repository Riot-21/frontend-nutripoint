import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../actions/get-brands.action";
import { getCategories } from "../actions/get-categories.action";
import { getPriceRange } from "../actions/get-price-range.action";

export const useBrandsAndCategories = () => {
  const brands = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const priceRange = useQuery({
    queryKey: ['price-range'],
    queryFn: getPriceRange,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    brands,
    categories,
    priceRange
  };
};
