import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import { Suspense, type PropsWithChildren } from "react";
import { CustomScreenLoading } from "./components/custom/CustomScreenLoading";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "./modules/auth/store/auth.store";

const queryClient = new QueryClient();

const CheckRefreshAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["auth-status"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 50,
    refetchOnWindowFocus: true,
  });

  if ( isLoading) return <CustomScreenLoading />;
  return children;
};

export const NutripointApp = () => {
  return (
    <GoogleOAuthProvider clientId="976432343550-l0c0jfauoirubdatjhl8ogv19slcitn0.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <Toaster></Toaster>
        <CheckRefreshAuthProvider>
          <Suspense fallback={<CustomScreenLoading></CustomScreenLoading>}>
            <RouterProvider router={appRouter}></RouterProvider>
          </Suspense>
        </CheckRefreshAuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};
