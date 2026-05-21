import { ShopFooter } from "@/modules/shop/components/custom/ShopFooter";
import { ShopHeader } from "@/modules/shop/components/custom/ShopHeader";
import { Outlet } from "react-router";
import { ScrollToTop } from "@/components/custom/ScrollToTop";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <ShopHeader></ShopHeader>
      <Outlet></Outlet>

      <ShopFooter></ShopFooter>
    </div>
  );
};

export default AuthLayout;
