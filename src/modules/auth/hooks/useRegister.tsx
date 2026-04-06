import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../actions/register.action";
import { useAuthStore } from "../store/auth.store";

export const useRegister = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: registerAction,
    onSuccess: (data) => {
      setAuth(data);
    },
    onError: () => {
      logout();
    },
  });
};
