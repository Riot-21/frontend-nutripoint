import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProductAction } from "../actions/create-product.action";

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createProductAction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['products']})
        },
    });

    return mutation ;
}
