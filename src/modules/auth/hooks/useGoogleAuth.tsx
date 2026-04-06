import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth.store"
import { googleAuthAction } from "../actions/google-auth.action";

export const useGoogleAuth = (mode: 'login' | 'register') => {
    const setAuth = useAuthStore((s) => s.setAuth);
    const logout = useAuthStore((s) => s.logout);

    return useMutation({
        mutationFn: (token: string) => googleAuthAction(token, mode),
        onSuccess: (data) => {
            setAuth(data);
        },
        onError: () => {
            logout();
        }
    })
}
