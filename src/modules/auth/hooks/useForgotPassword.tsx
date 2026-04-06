import { useMutation } from "@tanstack/react-query"
import { forgotPasswordAction } from "../actions/forgot-password.action"

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPasswordAction,
  })
}
