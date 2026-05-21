import { create } from "zustand";
import type {
  AuthResponse,
  UserResponse,
} from "../interfaces/auth-response.interface";
import { persist } from "zustand/middleware";
import { checkRefreshAuthAction } from "../actions/check-refresh-auth.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  //Properties
  user: UserResponse | null;
  token: string | null;
  authStatus: AuthStatus;
  //Getters
  isAdmin: () => boolean;
  //Actions
  setAuth: (data: AuthResponse) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      authStatus: "checking",

      isAdmin: () => {
        const roles = get().user?.roles ?? [];
        return roles?.includes("ADMIN") || roles?.includes("SUPER_ADMIN");
      },
      setAuth: (data: AuthResponse) => {
        set({
          user: data.user,
          token: data.token,
          authStatus: "authenticated",
        });
      },
      logout: () => {
        set({
          user: null,
          token: null,
          authStatus: "not-authenticated",
        });
      },
      checkAuthStatus: async () => {
        try {
          const data = await checkRefreshAuthAction();
          get().setAuth(data);
          return true;
        } catch (error) {
          get().logout();
          return false;
        }
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
);
