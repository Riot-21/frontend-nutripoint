import { useMutation } from "@tanstack/react-query"
import { resetPasswordAction } from "../actions/reset-password.action"

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordAction,
  })
}