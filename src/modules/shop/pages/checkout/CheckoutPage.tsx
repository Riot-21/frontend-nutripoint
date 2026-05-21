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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePurchase } from "../../hooks/usePurchase";

import { toast } from "sonner";
import {
  purchaseSchema,
  type PurchaseRequest,
} from "../../interfaces/purchase-request.schema";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const { mutateAsync: createPurchase, isPending } = usePurchase();

  const shippingCost = total >= 150 ? 0 : 10;
  const igv = total * 0.18;
  const finalTotal = total + shippingCost + igv;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PurchaseRequest>({
    resolver: zodResolver(purchaseSchema),

    defaultValues: {
      tipoPago: "CREDITO",
      direccion: "",
      distrito: "",

      detalles: items.map((item) => ({
        cantidad: item.quantity,
        idProducto: item.product.idProducto,
      })),
    },
  });

  const paymentMethod = watch("tipoPago");

  const onSubmit = async (values: PurchaseRequest) => {
    try {
      const response = await createPurchase(values);
      console.log('compra: ', response)

      toast.success("Compra realizada correctamente");

      clearCart();

      navigate("/success", {
        replace: true,
        state: {
          purchase: response.codigoCompra,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error al procesar la compra");
      }
    }
  };

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
              <Button size="lg" className="bg-primary hover:bg-[#d4af37]">
                Ver Productos
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link to="/cart">
            <Button variant="ghost" className="mb-6 -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Carrito
            </Button>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Finalizar <span className="text-[#d4af37]">Compra</span>
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* LEFT */}
              <div className="lg:col-span-2 space-y-6">
                {/* SHIPPING */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-[#d4af37]" />
                      Información de Envío
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* USER INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nombre Completo</Label>

                        <Input
                          value={`${user?.nombres ?? ""} ${user?.apellidos ?? ""}`}
                          disabled
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Teléfono</Label>

                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                          <Input
                            value={user?.telefono ?? ""}
                            disabled
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Correo Electrónico</Label>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                        <Input
                          value={user?.email ?? ""}
                          disabled
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* DIRECCION */}
                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección *</Label>

                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                        <Input
                          id="direccion"
                          placeholder="Av. Perú 123"
                          {...register("direccion")}
                          className="pl-10"
                        />
                      </div>

                      {errors.direccion && (
                        <p className="text-sm text-red-500">
                          {errors.direccion.message}
                        </p>
                      )}
                    </div>

                    {/* DISTRITO */}
                    <div className="space-y-2">
                      <Label htmlFor="distrito">Distrito *</Label>

                      <Input
                        id="distrito"
                        placeholder="San Martín de Porres"
                        {...register("distrito")}
                      />

                      {errors.distrito && (
                        <p className="text-sm text-red-500">
                          {errors.distrito.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* PAYMENT */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-[#d4af37]" />
                      Método de Pago
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => {
                        // react-hook-form update manual
                        (
                          document.querySelector(
                            'input[name="tipoPago"]',
                          ) as HTMLInputElement
                        ).value = value;
                      }}
                    >
                      <input type="hidden" {...register("tipoPago")} />

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="CREDITO" id="card" />

                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          Tarjeta de Crédito/Débito
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="DEBITO" id="paypal" />

                        <Label
                          htmlFor="paypal"
                          className="flex-1 cursor-pointer"
                        >
                          PayPal
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="DEBITO" id="transfer" />

                        <Label
                          htmlFor="transfer"
                          className="flex-1 cursor-pointer"
                        >
                          Transferencia Bancaria
                        </Label>
                      </div>
                    </RadioGroup> */}
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) =>
                        setValue(
                          "tipoPago",
                          value as PurchaseRequest["tipoPago"],
                        )
                      }
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="CREDITO" id="card" />

                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          Tarjeta de Crédito/Débito
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="PAYPAL" id="paypal" />

                        <Label
                          htmlFor="paypal"
                          className="flex-1 cursor-pointer"
                        >
                          PayPal
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="TRANSFERENCIA" id="transfer" />

                        <Label
                          htmlFor="transfer"
                          className="flex-1 cursor-pointer"
                        >
                          Transferencia Bancaria
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "CREDITO" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="space-y-2">
                          <Label>Número de Tarjeta</Label>

                          <Input
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Nombre en la Tarjeta</Label>

                          <Input placeholder="JUAN PEREZ" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Fecha Exp.</Label>

                            <Input placeholder="MM/AA" maxLength={5} />
                          </div>

                          <div className="space-y-2">
                            <Label>CVV</Label>

                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                              <Input
                                placeholder="123"
                                maxLength={4}
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Resumen del Pedido</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* PRODUCTS */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div
                          key={item.product.idProducto}
                          className="flex gap-3"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                            <img
                              src={
                                item.product.imagenesUrls[0] ??
                                "/placeholder.svg"
                              }
                              alt={item.product.nombre}
                              className="object-cover w-full h-full"
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
                              S/{" "}
                              {(
                                item.product.preciounit * item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* TOTALS */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>

                        <span className="font-semibold">
                          S/ {total.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Envío</span>

                        <span className="font-semibold">
                          {shippingCost === 0
                            ? "GRATIS"
                            : `S/ ${shippingCost.toFixed(2)}`}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">IGV (18%)</span>

                        <span className="font-semibold">
                          S/ {igv.toFixed(2)}
                        </span>
                      </div>

                      <Separator />

                      <div className="flex justify-between">
                        <span className="font-bold text-lg">Total</span>

                        <span className="font-bold text-2xl text-primary">
                          S/ {finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-[#d4af37]"
                      disabled={isPending}
                    >
                      {isPending ? "Procesando..." : "Confirmar Pedido"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Al confirmar tu pedido aceptas nuestros términos y
                      condiciones.
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
