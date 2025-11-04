import { createBrowserRouter, Navigate } from "react-router";
import ShopLayout from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductsPage } from "./shop/pages/products/ProductsPage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { AboutPage } from "./shop/pages/about/AboutPage";
import { ContactPage } from "./shop/pages/contact/ContactPage";


export const appRouter = createBrowserRouter([
    //Main routes
    {
        path: '/',
        element: <ShopLayout></ShopLayout>,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>
            },
            {
                path: "products",
                element: <ProductsPage></ProductsPage>
            },
            {
                path: "products/:id",
                element: <ProductPage></ProductPage>
            },
            {
                path: "about",
                element: <AboutPage></AboutPage>
            },
            {
                path: "contact",
                element: <ContactPage></ContactPage>
            },
        ]
    },

    //Auth routes, admin routes,etc

    {
        path: "*",
        element: <Navigate to='/'></Navigate>
    }
])