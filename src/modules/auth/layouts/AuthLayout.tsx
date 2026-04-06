import { ShopFooter } from "@/modules/shop/components/custom/ShopFooter";
import { ShopHeader } from "@/modules/shop/components/custom/ShopHeader";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <ShopHeader></ShopHeader>
      <Outlet></Outlet>

      <ShopFooter></ShopFooter>
    </div>
  );
};

export default AuthLayout;