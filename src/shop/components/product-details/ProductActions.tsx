import { Button } from "@/components/ui/button"
// import type { Product } from "@/interfaces/product.interface"
import type { ProductInterface } from "@/interfaces/products.interface"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useState } from "react"

interface ProductActionsProps {
  product: ProductInterface
}

export const ProductActions = ({ product }: ProductActionsProps) => {
//   const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    // addItem(product, quantity)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsAdding(false)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

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
        className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white transition-smooth text-lg py-6"
        onClick={handleAddToCart}
        disabled={product.stock === 0 || isAdding}
      >
        {isAdding ? (
          "Agregando..."
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Agregar al Carrito - ${(product.preciounit * quantity).toFixed(2)}
          </>
        )}
      </Button>
    </>
  )
}
