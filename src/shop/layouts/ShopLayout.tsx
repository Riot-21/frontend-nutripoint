import { Outlet } from 'react-router'
import { ShopFooter } from "../components/ShopFooter";
import { ShopHeader } from "../components/ShopHeader";

const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
        <ShopHeader></ShopHeader>
        <Outlet></Outlet>

        <ShopFooter></ShopFooter>
    </div>
  )
}

export default ShopLayout;
