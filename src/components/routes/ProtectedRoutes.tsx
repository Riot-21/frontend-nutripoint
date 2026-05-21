import { useAuthStore } from "@/modules/auth/store/auth.store";
import { type PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { CustomScreenLoading } from "../custom/CustomScreenLoading";

// Ruta para usuarios autenticados, en caso no lo estén redirige a login
export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();
  if (authStatus === "checking") return <CustomScreenLoading />;

  if (authStatus === "not-authenticated")
    return <Navigate to="/auth/login" replace />;

  return children;
};

// Ruta para usuarios no autenticados, en caso lo estén redirige a home
export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "checking") return <CustomScreenLoading />;

  if (authStatus === "authenticated") return <Navigate to="/" replace />;

  return children;
};

// Ruta para administradores
export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { authStatus, isAdmin } = useAuthStore();
  if (authStatus === "checking") return <CustomScreenLoading />;

  if (authStatus === "not-authenticated")
    return <Navigate to="/auth/login" replace />;

  if (!isAdmin()) return <Navigate to="/" replace />;

  return children;
};
