import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { CustomScreenLoading } from "./components/custom/CustomScreenLoading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const NutripointApp = () => {
  return (
    <GoogleOAuthProvider clientId="976432343550-l0c0jfauoirubdatjhl8ogv19slcitn0.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <Toaster></Toaster>
        <Suspense fallback={<CustomScreenLoading></CustomScreenLoading>}>
          <RouterProvider router={appRouter}></RouterProvider>
        </Suspense>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};
