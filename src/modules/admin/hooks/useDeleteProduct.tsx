import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductAction } from "../actions/delete-product.action";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteProductAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return mutation;
};