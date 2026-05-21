import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { mockProducts2 } from "@/mocks/mocks";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export const ProductsDashboard = () => {
  //   const { user, isLoading } = useAuthStore()
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(mockProducts2);
  // const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  //   useEffect(() => {
  //     if (!isLoading && (!user || !user.isAdmin)) {
  //       router.push("/login")
  //     }
  //   }, [user, isLoading, router])

  //   if (isLoading || !user || !user.isAdmin) {
  //     return null
  //   }

  const handleEdit = (product: (typeof products)[0]) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                category: formData.category,
              }
            : p,
        ),
      );
    }
    setOpen(false);
    setFormData({ name: "", price: "", stock: "", category: "" });
    setEditingId(null);
  };

  return (
    <div className="flex bg-background animate-fade-in">
      <main className="flex-1 p-8">
        <div className="max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Gestión de Productos
              </h1>
              <p className="text-muted-foreground">
                Total: {products.length} productos
              </p>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white transition-smooth hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Nuevo Producto
            </Button>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogOverlay className="bg-black/40 backdrop-blur-sm" /> */}
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Editar Producto" : "Nuevo Producto"}
                </DialogTitle>

                <DialogDescription>
                  Completa la información del producto.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Precio"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Categoría"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>

                  <Button
                    className="bg-accent hover:bg-accent/90 text-white"
                    onClick={handleSave}
                  >
                    Guardar
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>

          {/* Products Table */}
          <Card className="p-6 border-border/50">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Imagen
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Nombre
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Precio
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Stock
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Categoría
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Rating
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-border hover:bg-muted/50 transition-smooth"
                    >
                      <td className="py-3 px-4">
                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-foreground">
                        {product.name}
                      </td>
                      <td className="py-3 px-4 font-semibold text-accent">
                        ${product.price}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            product.stock > 20
                              ? "bg-green-500/10 text-green-600"
                              : product.stock > 5
                                ? "bg-yellow-500/10 text-yellow-600"
                                : "bg-red-500/10 text-red-600"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-sm">
                        {product.category}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold text-foreground">
                            {product.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviews})
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-600 hover:bg-blue-500/10"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:bg-red-500/10"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
  );
};
