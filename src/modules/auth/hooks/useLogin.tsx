import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store"
import { loginAction } from "../actions/login.action";

export const useLogin = () => {
    const setAuth = useAuthStore((s) => s.setAuth);
    const logout = useAuthStore((s) => s.logout);

    return useMutation({
        mutationFn: loginAction,
        onSuccess: (data) => {
            setAuth(data);
        },
        onError: () => {
            logout();
        }
    })

}