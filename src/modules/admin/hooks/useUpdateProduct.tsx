import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProductAction } from "../actions/update-product.action";

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateProductAction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']});
        },
    });

    return mutation 
}
