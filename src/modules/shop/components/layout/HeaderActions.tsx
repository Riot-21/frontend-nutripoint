import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router";
import { LogOut, ShieldCheck, User } from "lucide-react";
import { loginItems } from "../../consts/login-items";

export const HeaderActions = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isAdmin = user?.roles.includes("ADMIN");
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9 border">
                <AvatarFallback className="bg-primary text-white font-semibold">
                  {user.nombres?.charAt(0)}
                  {user.apellidos?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            {/* USER INFO */}
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

            {/* LOGIN ITEMS */}
            {loginItems.map((item) => (
              <DropdownMenuItem
                asChild
                className="cursor-pointer transition-colors duration-120"
              >
                <Link to={item.to}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}

            {/* ADMIN */}
            {isAdmin && (
              <DropdownMenuItem
                asChild
                className="cursor-pointer transition-colors duration-120"
              >
                <Link to="/admin">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Panel Admin
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            {/* LOGOUT */}
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer text-red-500 focus:text-red-500 transition-colors duration-120"
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
            className="transition-smooth hover:bg-accent hover:scale-110"
          >
            <User className="h-5 w-5" />
          </Button>
        </Link>
      )}
    </>
  );
};
