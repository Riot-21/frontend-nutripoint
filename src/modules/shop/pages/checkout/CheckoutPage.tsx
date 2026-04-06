import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CreditCard,
  Truck,
  MapPin,
  Phone,
  Mail,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "../../store/useCart";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { Link, useNavigate } from "react-router";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.nombres || "",
    email: user?.email || "",
    phone: user?.telefono || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "España",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-16 px-4">
            <h2 className="text-2xl font-bold mb-4">
              No hay productos en el carrito
            </h2>
            <p className="text-muted-foreground mb-8">
              Agrega productos antes de proceder al checkout
            </p>
            <Link to="/">
              <Button
                size="lg"
                className="bg-primary hover:bg-[#d4af37] transition-smooth"
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
  const tax = total * 0.21; // 21% IVA
  const finalTotal = total + shippingCost + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear cart and redirect to success page
    clearCart();
    navigate("/success", { replace: true });
    // router.push("/checkout/success");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link to="/cart">
            <Button
              variant="ghost"
              className="mb-6 -ml-4 transition-smooth hover:bg-accent"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Carrito
            </Button>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Finalizar <span className="text-[#d4af37]">Compra</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Truck className="h-5 w-5 text-[#d4af37]" />
                      <span>Información de Envío</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nombre Completo *</Label>
                        <Input
                          id="fullName"
                          value={shippingInfo.fullName}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              fullName: e.target.value,
                            })
                          }
                          required
                          className="transition-smooth focus:ring-2 focus:ring-[#d4af37]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+34 600 000 000"
                            value={shippingInfo.phone}
                            onChange={(e) =>
                              setShippingInfo({
                                ...shippingInfo,
                                phone: e.target.value,
                              })
                            }
                            required
                            className="pl-10 transition-smooth focus:ring-2 focus:ring-[#d4af37]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              email: e.target.value,
                            })
                          }
                          required
                          className="pl-10 transition-smooth focus:ring-2 focus:ring-[#d4af37]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          placeholder="Calle, número, piso, puerta"
                          value={shippingInfo.address}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              address: e.target.value,
                            })
                          }
                          required
                          className="pl-10 transition-smooth focus:ring-2 focus:ring-[#d4af37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad *</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              city: e.target.value,
                            })
                          }
                          required
                          className="transition-smooth focus:ring-2 focus:ring-[#d4af37]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Provincia *</Label>
                        <Input
                          id="state"
                          value={shippingInfo.state}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              state: e.target.value,
                            })
                          }
                          required
                          className="transition-smooth focus:ring-2 focus:ring-[#d4af37]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Código Postal *</Label>
                        <Input
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              zipCode: e.target.value,
                            })
                          }
                          required
                          className="transition-smooth focus:ring-2 focus:ring-[#d4af37]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-[#d4af37]" />
                      <span>Método de Pago</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <div className="flex items-center space-x-2 p-4 border border-border rounded-lg transition-smooth hover:bg-accent cursor-pointer">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              Tarjeta de Crédito/Débito
                            </span>
                            <div className="flex space-x-2">
                              <svg
                                className="h-6 w-auto"
                                viewBox="0 0 48 32"
                                fill="none"
                              >
                                <rect
                                  width="48"
                                  height="32"
                                  rx="4"
                                  fill="#1434CB"
                                />
                                <circle cx="18" cy="16" r="8" fill="#EB001B" />
                                <circle cx="30" cy="16" r="8" fill="#FF5F00" />
                              </svg>
                              <svg
                                className="h-6 w-auto"
                                viewBox="0 0 48 32"
                                fill="none"
                              >
                                <rect
                                  width="48"
                                  height="32"
                                  rx="4"
                                  fill="#0066B2"
                                />
                                <path
                                  d="M20 10h8v12h-8z"
                                  fill="#FFF"
                                  fillOpacity="0.7"
                                  transform="translate(0 0)"
                                />
                              </svg>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border border-border rounded-lg transition-smooth hover:bg-accent cursor-pointer">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label
                          htmlFor="paypal"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">PayPal</span>
                            <svg
                              className="h-6 w-auto"
                              viewBox="0 0 100 32"
                              fill="none"
                            >
                              <path
                                d="M12 8h8c4 0 6 2 6 6s-2 6-6 6h-4l-1 6H9l3-18z"
                                fill="#003087"
                              />
                              <path
                                d="M20 12h8c4 0 6 2 6 6s-2 6-6 6h-4l-1 6h-6l3-18z"
                                fill="#009CDE"
                              />
                            </svg>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border border-border rounded-lg transition-smooth hover:bg-accent cursor-pointer">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label
                          htmlFor="transfer"
                          className="flex-1 cursor-pointer"
                        >
                          <span className="font-medium">
                            Transferencia Bancaria
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "card" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">
                            Número de Tarjeta *
                          </Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardInfo.cardNumber}
                            onChange={(e) =>
                              setCardInfo({
                                ...cardInfo,
                                cardNumber: e.target.value,
                              })
                            }
                            required
                            maxLength={19}
                            className="transition-smooth focus:ring-2 focus:ring-[#d4af37]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardName">
                            Nombre en la Tarjeta *
                          </Label>
                          <Input
                            id="cardName"
                            placeholder="JUAN PEREZ"
                            value={cardInfo.cardName}
                            onChange={(e) =>
                              setCardInfo({
                                ...cardInfo,
                                cardName: e.target.value,
                              })
                            }
                            required
                            className="transition-smooth focus:ring-2 focus:ring-[#d4af37]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">
                              Fecha de Expiración *
                            </Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/AA"
                              value={cardInfo.expiryDate}
                              onChange={(e) =>
                                setCardInfo({
                                  ...cardInfo,
                                  expiryDate: e.target.value,
                                })
                              }
                              required
                              maxLength={5}
                              className="transition-smooth focus:ring-2 focus:ring-[#d4af37]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={cardInfo.cvv}
                                onChange={(e) =>
                                  setCardInfo({
                                    ...cardInfo,
                                    cvv: e.target.value,
                                  })
                                }
                                required
                                maxLength={4}
                                className="pl-10 transition-smooth focus:ring-2 focus:ring-[#d4af37]"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-muted p-3 rounded-lg flex items-start space-x-2">
                          <Lock className="h-4 w-4 text-[#d4af37] shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground">
                            Tu información de pago está protegida con
                            encriptación SSL de 256 bits
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Resumen del Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Products */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.product.idProducto} className="flex gap-3">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                            <img
                              src={item.product.imagenesUrls[0] || "/placeholder.svg"}
                              alt={item.product.nombre}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-2">
                              {item.product.nombre}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Cantidad: {item.quantity}
                            </p>
                            <p className="text-sm font-semibold">
                              ${(item.product.preciounit * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">
                          ${total.toFixed(2)}
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
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">IVA (21%)</span>
                        <span className="font-semibold">${tax.toFixed(2)}</span>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-2xl text-primary">
                          ${finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-[#d4af37] transition-smooth"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Procesando..." : "Confirmar Pedido"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Al confirmar tu pedido, aceptas nuestros términos y
                      condiciones
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
