import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImageAction } from "../actions/delete-image.action";

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteImageAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return mutation;
};