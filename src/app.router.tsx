import { createBrowserRouter, Navigate } from "react-router";
import ShopLayout from "./modules/shop/layouts/ShopLayout";
import { HomePage } from "./modules/shop/pages/home/HomePage";
import { ProductsPage } from "./modules/shop/pages/products/ProductsPage";
import { ProductPage } from "./modules/shop/pages/product/ProductPage";
import { AboutPage } from "./modules/shop/pages/about/AboutPage";
import { ContactPage } from "./modules/shop/pages/contact/ContactPage";
import CartPage from "./modules/shop/pages/cart/CartPage";
import AuthLayout from "./modules/auth/layouts/AuthLayout";
import LoginPage from "./modules/auth/pages/login/LoginPage";
import RegisterPage from "./modules/auth/pages/register/RegisterPage";
import CheckoutPage from "./modules/shop/pages/checkout/CheckoutPage";
import CheckoutSuccessPage from "./modules/shop/pages/success/CheckoutSuccessPage";
import ForgotPasswordPage from "./modules/auth/pages/recover-password/ForgotPasswordPage";
import ResetPasswordPage from "./modules/auth/pages/recover-password/ResetPasswordPage";

export const appRouter = createBrowserRouter([
  //Main routes
  {
    path: "/",
    element: <ShopLayout></ShopLayout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "products",
        element: <ProductsPage></ProductsPage>,
      },
      {
        path: "products/:id",
        element: <ProductPage></ProductPage>,
      },
      {
        path: "about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "contact",
        element: <ContactPage></ContactPage>,
      },
      {
        path: "cart",
        element: <CartPage></CartPage>,
      },
      {
        path: "checkout",
        element: <CheckoutPage></CheckoutPage>
      },
      {
        path: "success",
        element: <CheckoutSuccessPage></CheckoutSuccessPage>
      }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        index: true,
        element: <Navigate to='/auth/login'></Navigate>
      },
      {
        path: "login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage></ForgotPasswordPage>,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage></ResetPasswordPage>,
      },
    ],
  },

  //Auth routes, admin routes,etc

  {
    path: "*",
    element: <Navigate to="/"></Navigate>,
  },
]);
