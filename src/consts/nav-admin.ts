import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
} from "lucide-react";

export const NAV_ADMIN = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/products", icon: Package, label: "Productos" },
  { href: "/admin/users", icon: Users, label: "Usuarios" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Pedidos" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
];
