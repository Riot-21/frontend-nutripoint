import { useState } from "react";
import { Outlet } from "react-router";
import { AdminSidebar } from "../components/AdminSidebar";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main className="flex-1 overflow-y-auto p-8 transition-all duration-300 w-full relative">
        <Outlet />
      </main>
    </div>
  )
}
