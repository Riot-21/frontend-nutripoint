import { Outlet } from "react-router";
import { ShopFooter } from "../components/layout/ShopFooter";
import { ShopHeader } from "../components/layout/ShopHeader";
import { ScrollToTop } from "../../../components/custom/ScrollToTop";

const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <ShopHeader></ShopHeader>
      <Outlet></Outlet>

      <ShopFooter></ShopFooter>
    </div>
  );
};

export default ShopLayout;
