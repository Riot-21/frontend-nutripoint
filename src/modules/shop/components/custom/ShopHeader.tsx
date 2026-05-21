import { useState } from "react";
import { Link } from "react-router";
import { ShopNavbar } from "./ShopNavBar";
import { CartSidebar } from "../cart-sidebar/CartSidebar";
import { ShopSearchBar } from "./ShopSearchBar";
import { MobileNavBar } from "./MobileNavBar";
import { Button } from "@/components/ui/button";
import { LogOut, Package, ShieldCheck, User } from "lucide-react";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
          <div className="hidden lg:block">
            <ShopNavbar />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex  px-6 min-w-0">
            <ShopSearchBar />
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center space-x-3">
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
            {/* {user ? (
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
            )} */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-9 w-9 border">
                      <AvatarFallback className="bg-primary text-white font-semibold">
                        {user.nombres?.charAt(0)}
                        {user.apellidos?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {user.nombres} {user.apellidos}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </DropdownMenuItem>
                  </Link>

                  <Link to="/orders">
                    <DropdownMenuItem className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      Mis Compras
                    </DropdownMenuItem>
                  </Link>

                  {/* ADMIN */}
                  {user.roles.includes("ADMIN") && (
                    <Link to="/admin">
                      <DropdownMenuItem className="cursor-pointer">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Panel Admin
                      </DropdownMenuItem>
                    </Link>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth/login">
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-smooth hover:bg-accent/10 hover:scale-110"
                >
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
