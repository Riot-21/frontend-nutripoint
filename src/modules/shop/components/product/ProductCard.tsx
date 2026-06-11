import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import type { Product } from "@/interfaces/product.interface"
import type { ProductInterface } from "@/modules/shop/interfaces/products-response.interface";
import { currencyFormatter } from "@/lib/currency-formatter";
import { sleep } from "@/lib/sleep";
import { useCart } from "@/modules/shop/store/useCart";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface ProductCardProps {
  product: ProductInterface;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem(product);
    await sleep(300);
    setIsAdding(false);
  };

  return (
    <Card className="group overflow-hidden transition-smooth hover:shadow-2xl hover:-translate-y-2 border-border/50 bg-card">
      <Link to={`/products/${product.idProducto}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.imagenes[0]?.url || "/placeholder.svg"}
            alt={product.nombre}
            className="object-cover w-full h-full transition-smooth group-hover:scale-110"
          />
          {product.stock < 10 && product.stock > 0 && (
            <Badge className="absolute top-3 right-3 bg-destructive text-white shadow-lg">
              Últimas unidades
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge className="absolute top-3 right-3 bg-secondary text-white shadow-lg">
              Agotado
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-5">
        <Link to={`/products/${product.idProducto}`}>
          {product.categorias.map((c) => (
            <Badge
              key={c}
              variant="outline"
              className="mb-3 text-xs border-[#1e40af] text-[#1e40af] bg-[#1e40af]/5 mr-1"
            >
              {c}
            </Badge>
          ))}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 transition-smooth group-hover:text-[#1e40af]">
            {product.nombre}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            {product.descripcion}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
            Marca: {product.marca}
          </p>
        </Link>

        <div className="flex items-center space-x-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.preciounit)
                    ? "fill-[#3b82f6] text-[#3b82f6]"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.stock})
          </span>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-[#0a1628]">
            {currencyFormatter(product.preciounit)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button
          className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white transition-smooth hover:scale-105 shadow-md hover:shadow-lg"
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
        >
          {isAdding ? (
            "Agregando..."
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Agregar al Carrito
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
