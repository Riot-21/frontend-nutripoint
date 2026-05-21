import { Card } from "@/components/ui/card"
import { Package, Users, ShoppingCart, TrendingUp } from "lucide-react"
import { useAuthStore } from "@/modules/auth/store/auth.store";

export function MainDashboard() {
  const user = useAuthStore((s) => s.user);

  const stats = [
    {
      title: "Total Productos",
      icon: Package,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Total Usuarios",
      icon: Users,
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: "Pedidos Pendientes",
      icon: ShoppingCart,
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      title: "Ingresos Totales",
      icon: TrendingUp,
      color: "bg-purple-500/10 text-purple-600",
    },
  ]

  return (
    <div className="max-w-7xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Panel de Administración</h1>
        <p className="text-muted-foreground">Bienvenido, {user?.nombres}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-6 border-border/50 hover:border-border transition-smooth">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Orders */}
      <Card className="p-6 border-border/50">
        <h2 className="text-xl font-bold text-foreground mb-4">Pedidos Recientes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">ID Pedido</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Cliente</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Estado</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {/* Mock orders here */}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
