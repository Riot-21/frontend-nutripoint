import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { currencyFormatter } from "@/lib/currency-formatter";
import type {
  ProductInterface,
  ProductsResponse,
} from "@/modules/shop/interfaces/products-response.interface";
import { Edit2, Trash2 } from "lucide-react";

interface ProductTableProps {
  products?: ProductsResponse;
  onEdit: (product: ProductInterface) => void;
  onDelete: (id: number) => void;
}

export const ProductTable = ({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  return (
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
              {/* <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Rating
                    </th> */}
              <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {!products || products?.content.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-muted-foreground"
                >
                  No se encontraron productos
                </td>
              </tr>
            ) : (
              products.content.map((product) => (
                <tr
                  key={product.idProducto}
                  className="border-b border-border hover:bg-muted/50 transition-smooth"
                >
                  <td className="py-3 px-4">
                    <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted">
                      <img
                      //! poner placeholder
                        src={product.imagenes[0]?.url ?? "/placeholder-product.png"}
                        alt={product.nombre}
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-foreground">
                    {product.nombre}
                  </td>
                  <td className="py-3 px-4 font-semibold text-blue-900">
                    {currencyFormatter(product.preciounit)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-base font-semibold ${
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
                    {product.categorias}
                  </td>
                  {/* <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold text-foreground">
                            {product.rating}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviews})
                          </span>
                        </div>
                      </td> */}
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:bg-blue-500/10"
                        onClick={() => onEdit(product)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:bg-red-500/10"
                        onClick={() => onDelete(product.idProducto)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
