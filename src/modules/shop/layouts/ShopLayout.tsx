import { Outlet } from "react-router";
import { ShopFooter } from "../components/custom/ShopFooter";
import { ShopHeader } from "../components/custom/ShopHeader";

const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <ShopHeader></ShopHeader>
      <Outlet></Outlet>

      <ShopFooter></ShopFooter>
    </div>
  );
};

export default ShopLayout;
