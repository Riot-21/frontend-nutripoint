
import { Card } from "@/components/ui/card"
import { mockUsers } from "@/mocks/mocks"
import { Check, X } from "lucide-react"

export const UserDashboard = () => {

  return (
    <div className="flex bg-background">

      <main className="flex-1 p-8">
        <div className="max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Gestión de Usuarios</h1>
            <p className="text-muted-foreground">Total: {mockUsers.length} usuarios registrados</p>
          </div>

          <Card className="p-6 border-border/50">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Nombre</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Fecha Registro</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                      <td className="py-3 px-4 font-medium text-foreground text-sm">{user.id}</td>
                      <td className="py-3 px-4 font-medium text-foreground">{user.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4 text-muted-foreground text-sm">{user.createdAt}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {user.status === "active" ? (
                            <>
                              <Check className="h-4 w-4 text-green-600" />
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-600">
                                Activo
                              </span>
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4 text-red-600" />
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-600">
                                Inactivo
                              </span>
                            </>
                          )}
                        </div>
                      </td>
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
