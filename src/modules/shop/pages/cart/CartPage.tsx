import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currencyFormatter } from "@/lib/currency-formatter";
import { useCart } from "@/modules/shop/store/useCart";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col animate-fade-in">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-16 px-4">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-8">
              Agrega productos para comenzar tu compra
            </p>
            <Link to="/products">
              <Button
                size="lg"
                className="bg-[#1e40af] hover:bg-[#405cb9] transition-all duration-300"
              >
                Ver Productos
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const shippingCost = total >= 50 ? 0 : 5.99;
  const finalTotal = total + shippingCost;

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Carrito de <span className="text-blue-950">Compras</span>
            </h1>
            <p className="text-muted-foreground">
              Tienes {items.length} producto(s) en tu carrito
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card
                  key={item.product.idProducto}
                  className="overflow-hidden transition-smooth hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <Link
                        to={`/product/${item.product.idProducto}`}
                        className="shrink-0"
                      >
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={
                              item.product.imagenesUrls?.[0] ||
                              "/placeholder.svg"
                            }
                            alt={item.product.nombre}
                            className="object-cover transition-smooth hover:scale-110"
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.product.idProducto}`}>
                          <h3 className="font-semibold mb-1 hover:text-accent transition-smooth line-clamp-2">
                            {item.product.nombre}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.product.categorias}
                        </p>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-smooth hover:bg-accent"
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
                              className="h-8 w-8 transition-smooth hover:bg-accent"
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

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              {currencyFormatter(
                                item.product.preciounit * item.quantity,
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {currencyFormatter(item.product.preciounit)} c/u
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10 transition-smooth"
                        onClick={() => removeItem(item.product.idProducto)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Clear Cart Button */}
              <Button
                variant="outline"
                className="w-full transition-all duration-300 hover:bg-destructive/10 hover:text-destructive hover:border-destructive bg-transparent"
                onClick={clearCart}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Vaciar Carrito
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6">Resumen del Pedido</h2>

                  <div className="space-y-4 mb-6">
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
                          `$${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    {total < 50 && (
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-xs text-blue-950">
                          Agrega {currencyFormatter(50 - total)} más para
                          obtener envío gratis
                        </p>
                        <div className="w-full bg-border rounded-full h-2 mt-2">
                          <div
                            className="bg-[#8499db] h-2 rounded-full transition-smooth"
                            style={{ width: `${(total / 50) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-2xl text-[#1e40af]">
                        {currencyFormatter(finalTotal)}
                      </span>
                    </div>
                  </div>

                  <Link to="/checkout">
                    <Button
                      size="lg"
                      className="w-full bg-[#1e40af] hover:bg-[#405cb9] transition-all duration-300 transition-smooth group"
                    >
                      Proceder al Pago
                      <ArrowRight className="ml-2 h-5 w-5 transition-smooth group-hover:translate-x-1" />
                    </Button>
                  </Link>

                  <Link to="/">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full mt-3 transition-smooth bg-transparent hover:bg-[#b9c6f3] transition-all duration-300"
                    >
                      Continuar Comprando
                    </Button>
                  </Link>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Check size={18} className="text-blue-900"></Check>
                      <span className="text-muted-foreground">
                        Pago 100% seguro
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Check size={18} className="text-blue-900"></Check>
                      <span className="text-muted-foreground">
                        Envío en 24-48 horas
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Check size={18} className="text-blue-900"></Check>
                      <span className="text-muted-foreground">
                        Devolución en 30 días
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
