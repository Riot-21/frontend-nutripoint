import { Card } from "@/components/ui/card"
import { mockOrders } from "@/mocks/mocks"

export const OrderDashboard = () => {

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/10 text-green-600"
      case "shipped":
        return "bg-blue-500/10 text-blue-600"
      case "processing":
        return "bg-yellow-500/10 text-yellow-600"
      case "pending":
        return "bg-gray-500/10 text-gray-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      pending: "Pendiente",
      processing: "Procesando",
      shipped: "Enviado",
      delivered: "Entregado",
    }
    return labels[status] || status
  }

  return (
    <div className="flex bg-background">
      <main className="flex-1 p-8">
        <div className="max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Gestión de Pedidos</h1>
            <p className="text-muted-foreground">Total: {mockOrders.length} pedidos</p>
          </div>

          <Card className="p-6 border-border/50">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">ID Pedido</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Cliente</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Items</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                      <td className="py-3 px-4 font-bold text-foreground">{order.id}</td>
                      <td className="py-3 px-4 text-foreground">{order.userName}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-muted text-foreground">
                          {order.items}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-accent text-lg">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-sm">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
