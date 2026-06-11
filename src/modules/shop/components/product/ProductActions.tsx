import { Button } from "@/components/ui/button";
import type { ProductInterface } from "@/modules/shop/interfaces/products-response.interface";
import { currencyFormatter } from "@/lib/currency-formatter";
import { sleep } from "@/lib/sleep";
import { useCart } from "@/modules/shop/store/useCart";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductActionsProps {
  product: ProductInterface;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCart((state) => state.addItem);
  const items = useCart((state) => state.items);

  const cartItem = items.find(
    (i) => i.product.idProducto === product.idProducto,
  );

  const quantityInCart = cartItem?.quantity ?? 0;
  const reachedStockLimit = quantityInCart >= product.stock;
  const maxQuantity = product.stock - quantityInCart;

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem(product, quantity);
    await sleep(300);
    setQuantity(1);
    setIsAdding(false);
  };

  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      {/* Quantity Selector */}
      <div>
        <label className="font-semibold mb-3 block">Cantidad:</label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="transition-smooth hover:bg-accent"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={incrementQuantity}
              disabled={quantity >= product.stock}
              className="transition-smooth hover:bg-accent"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} disponibles` : "Sin stock"}
          </span>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full bg-[#3b82f6] hover:bg-[#2563eb] hover:shadow-lg text-white transition-smooth text-lg py-6"
        onClick={handleAddToCart}
        disabled={product.stock === 0 || isAdding || reachedStockLimit}
      >
        {isAdding ? (
          "Agregando..."
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Agregar al Carrito -{" "}
            {currencyFormatter(product.preciounit * quantity)}
          </>
        )}
      </Button>
      {reachedStockLimit && (
        <span className="text-red-900">
          Ya alcanzaste el stock máximo de este producto
        </span>
      )}
    </>
  );
};
