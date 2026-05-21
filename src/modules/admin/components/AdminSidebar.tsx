import { LogOut, ChevronLeft, ChevronRight, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router";
// import { useAuthStore } from "@/modules/auth/store/auth.store";
import { NAV_ADMIN } from "@/consts/nav-admin";

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
}: AdminSidebarProps) {
  const { pathname } = useLocation();
  // const logout = useAuthStore((s) => s.logout);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } border-r border-border bg-card/50 backdrop-blur-sm transition-all duration-300 flex flex-col h-full shrink-0 z-20`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <span className="font-bold text-lg text-foreground truncate pl-2">
            Administración
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`shrink-0 ${isCollapsed ? "mx-auto" : "ml-auto"}`}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-1 flex flex-col space-y-2 p-4 overflow-y-auto overflow-x-hidden">
        {NAV_ADMIN.map((item) => {
          const Icon = item.icon;
          const isItemActive = item.exact
            ? pathname === item.href
            : isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3 px-3"} py-3 rounded-lg transition-smooth ${
                isItemActive
                  ? "bg-accent text-white font-bold"
                  : "text-foreground/70 hover:bg-accent/10 hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          to={"/"}
          className={` border border-blue-900/60 rounded-lg py-1 w-full flex items-center justify-center space-x-2 transition-smooth hover:bg-red-500/10 hover:text-red-600 hover:border-red-500 ${
            isCollapsed ? "px-0" : ""
          }`}
          // onClick={logout}
          title={isCollapsed ? "Cerrar Sesión" : undefined}
        >
          <CornerDownLeft className="h-4 w-4 shrink-0" />
          {!isCollapsed && <span className="truncate">Salir</span>}
        </Link>
      </div>
    </aside>
  );
}
