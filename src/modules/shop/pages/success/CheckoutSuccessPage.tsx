import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import { Link, useLocation } from "react-router"

export default function CheckoutSuccessPage() {
  // const [orderNumber] = useState(() => `NP-${Date.now().toString().slice(-8)}`)

  const location = useLocation();
  const purchase = location.state?.purchase;

  useEffect(() => {
    // Confetti effect could be added here
  }, [])

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <Card className="border-border/50 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-500">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>

                {/* Success Message */}
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    ¡Pedido <span className="text-[#d4af37]">Confirmado!</span>
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
                  </p>
                </div>

                {/* Order Number */}
                <div className="bg-muted p-4 rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                  <p className="text-sm text-muted-foreground mb-1">Número de Pedido</p>
                  <p className="text-2xl font-bold text-primary">{purchase}</p>
                </div>

                {/* Next Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="h-6 w-6 text-[#d4af37]" />
                    </div>
                    <h3 className="font-semibold mb-1">Confirmación</h3>
                    <p className="text-sm text-muted-foreground">Recibirás un email con los detalles de tu pedido</p>
                  </div>

                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="h-6 w-6 text-[#d4af37]" />
                    </div>
                    <h3 className="font-semibold mb-1">Preparación</h3>
                    <p className="text-sm text-muted-foreground">Prepararemos tu pedido con cuidado</p>
                  </div>

                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Truck className="h-6 w-6 text-[#d4af37]" />
                    </div>
                    <h3 className="font-semibold mb-1">Envío</h3>
                    <p className="text-sm text-muted-foreground">Entrega en 24-48 horas hábiles</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
                  <Link to="/" className="flex-1">
                    <Button size="lg" className="w-full bg-primary hover:bg-[#d4af37] transition-smooth">
                      Seguir Comprando
                    </Button>
                  </Link>
                  <Link to="/orders" className="flex-1">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full transition-smooth hover:bg-accent bg-transparent"
                    >
                      Ver Mis Pedidos
                    </Button>
                  </Link>
                </div>

                {/* Support */}
                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    ¿Necesitas ayuda?{" "}
                    <Link to="/contact" className="text-[#d4af37] hover:underline font-semibold">
                      Contáctanos
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

    </div>
  )
}
