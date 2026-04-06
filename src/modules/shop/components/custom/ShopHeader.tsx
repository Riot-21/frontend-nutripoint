import { useState } from "react";
import { Link } from "react-router";
import { ShopNavbar } from "./ShopNavBar";
import { CartSidebar } from "../cart-sidebar/CartSidebar";
import { ShopSearchBar } from "./ShopSearchBar";
import { MobileNavBar } from "./MobileNavBar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useAuthStore } from "@/modules/auth/store/auth.store";

export const ShopHeader = () => {
  //   const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 transition-smooth hover:opacity-80"
          >
            <div className="flex items-center">
              <span className="text-3xl font-bold text-foreground font-montserrat">
                Nutri
              </span>
              <span className="text-3xl font-bold text-blue-950 font-montserrat">
                Point
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ShopNavbar></ShopNavbar>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6 relative">
            <ShopSearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* <Link to="/auth/login">
              <Button
                variant="ghost"
                size="icon"
                className="transition-smooth hover:bg-accent/10 hover:scale-110"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link> */}
            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Hola, {user.nombres}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="transition-smooth hover:bg-accent/10">
                  Salir
                </Button>
              </div>
            ) : (
              <Link to="/auth/login">
                <Button variant="ghost" size="icon" className="transition-smooth hover:bg-accent/10 hover:scale-110">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* !REVISAR */}
            <CartSidebar />

            {/* Mobile Menu */}

            <MobileNavBar
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            ></MobileNavBar>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <ShopSearchBar />
        </div>
      </div>
    </header>
  );
};
