import { useState } from "react";
import { Link } from "react-router";
import { HeaderNavBar } from "./HeaderNavBar";
import { CartSidebar } from "../cart/CartSidebar";
import { HeaderSearchBar } from "./HeaderSearchBar";
import { MobileNavBar } from "./MobileNavBar";
import { HeaderActions } from "./HeaderActions";

export const ShopHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
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
          <div className="hidden lg:block">
            <HeaderNavBar />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex  px-6 min-w-0">
            <HeaderSearchBar />
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center space-x-3">
            <HeaderActions />

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
          <HeaderSearchBar />
        </div>
      </div>
    </header>
  );
};
