import { useMutation } from "@tanstack/react-query"
import { createPurchaseAction } from "../actions/create-purchase.action"

export const usePurchase = () => {
    return useMutation({
        mutationFn: createPurchaseAction,
        retry: false
    })
}
