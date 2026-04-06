import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { ShoppingCart, X, Plus, Minus, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "@/modules/shop/store/useCart";
import { currencyFormatter } from "@/lib/currency-formatter";

export function CartSidebar() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const [open, setOpen] = useState(false);

  const shippingCost = total >= 50 ? 0 : 5.99;
  const finalTotal = total + shippingCost;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative transition-smooth hover:bg-accent hover:scale-110"
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs font-bold text-accent-foreground flex items-center justify-center animate-in">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="text-2xl font-bold">
            Carrito <span className="text-[#405cb9]">({itemCount})</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-6">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Agrega productos para comenzar
            </p>
            <Button
              onClick={() => setOpen(false)}
              className="bg-[#1e40af] hover:bg-[#405cb9] transition-all duration-300"
            >
              Explorar Productos
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.idProducto}
                  className="flex gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth"
                >
                  <Link
                    to={`/product/${item.product.idProducto}`}
                    onClick={() => setOpen(false)}
                    className="shrink-0"
                  >
                    <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted">
                      <img
                        src={
                          item.product.imagenesUrls?.[0] || "/placeholder.svg"
                        }
                        alt={item.product.nombre}
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product.idProducto}`}
                      onClick={() => setOpen(false)}
                    >
                      <h4 className="font-semibold text-sm mb-1 line-clamp-2 hover:text-blue-900 transition-smooth">
                        {item.product.nombre}
                      </h4>
                    </Link>
                    <p className="text-xs text-muted-foreground mb-3">
                      {item.product.categorias}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-accent/10"
                          onClick={() =>
                            updateQuantity(
                              item.product.idProducto,
                              item.quantity - 1,
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-accent/10"
                          onClick={() =>
                            updateQuantity(
                              item.product.idProducto,
                              item.quantity + 1,
                            )
                          }
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-base">
                          {currencyFormatter(
                            item.product.preciounit * item.quantity,
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeItem(item.product.idProducto)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t pt-6 pb-6 px-6 space-y-4 bg-muted/30">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">
                    {currencyFormatter(total)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">GRATIS</span>
                    ) : (
                      `${currencyFormatter(shippingCost)}`
                      //   `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                {/* {total < 50 && (
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-2">
                      Agrega ${(50 - total).toFixed(2)} más para envío gratis
                    </p>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-smooth"
                        style={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <Separator /> */}

                <div className="flex justify-between pt-2">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-[#405cb9]">
                    {currencyFormatter(finalTotal)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Link to="/checkout" onClick={() => setOpen(false)}>
                  <Button
                    size="lg"
                    className="w-full bg-[#1e40af] hover:bg-[#405cb9] transition-all duration-300 group"
                  >
                    Proceder al Pago
                    <ArrowRight className="ml-2 h-5 w-5 transition-smooth group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/cart" onClick={() => setOpen(false)}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full bg-transparent hover:bg-slate-500/10 transition-all duration-300"
                  >
                    Ver Carrito Completo
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
