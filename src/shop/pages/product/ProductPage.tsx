import { CustomScreenLoading } from "@/components/custom/CustomScreenLoading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { mockProducts } from "@/mocks/product.mock"
import { ProductActions } from "@/shop/components/product-details/ProductActions"
// import { ProductCarousel } from "@/shop/components/product-details/ProductCarousel"
import { useProductById } from "@/shop/hooks/useProductById"
import { ArrowLeft, Package, Shield,  Truck } from "lucide-react"
import { Link, Navigate,  useParams } from "react-router"

export const ProductPage = () => {
  // const resolvedParams = await params
  const { id } = useParams();
  // const navigate = useNavigate();

  const { data: product, isError, isLoading } = useProductById(Number(id));
  // const product = mockProducts.find((p) => p.id === id)

  if(isLoading){
    return <CustomScreenLoading></CustomScreenLoading>
  }

  if (isError || !product ) {
    //navigate() se usa dentro de handlers-funciones
    // navigate('/products')
    //replace para evitar volver atras y estar en la apgina con error
     return <Navigate to={'/products'} replace></Navigate>
  }

  // const relatedProducts = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-smooth">
              Inicio
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-foreground transition-smooth">
              Productos
            </Link>
            <span>/</span>
            
            <span className="text-foreground">{product.nombre}</span>
          </div>

          {/* Back Button */}
          <Link to="/products">
            <Button variant="ghost" className="mb-6 -ml-4 transition-smooth hover:bg-accent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Productos
            </Button>
          </Link>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <img src={product.imagenesUrls[0] || "/placeholder.svg"} alt={product.nombre}  className="object-cover" />
                {product.stock < 10 && product.stock > 0 && (
                  <Badge className="absolute top-4 right-4 bg-destructive text-white">Últimas unidades</Badge>
                )}
                {product.stock === 0 && (
                  <Badge className="absolute top-4 right-4 bg-secondary text-white">Agotado</Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-3 border-[#3b82f6] text-[#3b82f6]">
                  {product.marca}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.nombre}</h1>

                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  {product.marca && (
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>SKU: {product.marca}</span>
                    </div>
                  )}
                  {product.marca && (
                    <>
                      <span>•</span>
                      <span>Marca: {product.marca}</span>
                    </>
                  )}
                </div>

                {/* <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? "fill-[#3b82f6] text-[#3b82f6]" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                </div> */}

                <p className="text-muted-foreground text-lg leading-relaxed">{product.descripcion}</p>
              </div>

              <Separator />

              {/* Price */}
              <div>
                <div className="flex items-baseline space-x-3 mb-2">
                  <span className="text-4xl font-bold text-primary">${product.preciounit.toFixed(2)}</span>
                  <span className="text-muted-foreground">IVA incluido</span>
                </div>
                <p className="text-sm text-muted-foreground">Envío gratis en pedidos superiores a $50</p>
              </div>

              <Separator />

              {/* Benefits */}
              {/* <div>
                <h3 className="font-semibold mb-3">Beneficios Principales:</h3>
                <ul className="space-y-2">
                  {product.modEmpleo.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-[#3b82f6] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div> */}

              <Separator />

              <ProductActions product={product} />

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="border-border/50">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-full flex items-center justify-center shrink-0">
                      <Truck className="h-5 w-5 text-[#3b82f6]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Envío Rápido</p>
                      <p className="text-xs text-muted-foreground">24-48 horas</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-full flex items-center justify-center shrink-0">
                      <Shield className="h-5 w-5 text-[#3b82f6]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Compra Segura</p>
                      <p className="text-xs text-muted-foreground">100% protegida</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Card className="mb-16">
            <CardContent className="p-6">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Descripción</TabsTrigger>
                  <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
                  <TabsTrigger value="usage">Modo de Uso</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed">{product.descripcion}</p>
                    <h4 className="font-semibold mt-4 mb-2">Beneficios Detallados:</h4>
                    <ul className="space-y-2">
                      {/* {product.benefits.map((benefit, index) => (
                        <li key={index} className="text-muted-foreground">
                          {benefit}
                        </li>
                      ))} */}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="ingredients" className="mt-6">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.modEmpleo || "Información de ingredientes no disponible."}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="usage" className="mt-6">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.advert || "Información de uso no disponible."}
                    </p>
                    <div className="bg-muted p-4 rounded-lg mt-4">
                      <p className="text-sm font-semibold mb-2">Recomendaciones:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Consulta con un profesional de la salud antes de usar</li>
                        <li>• No exceder la dosis recomendada</li>
                        <li>• Mantener fuera del alcance de los niños</li>
                        <li>• Almacenar en un lugar fresco y seco</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* {relatedProducts.length > 0 &&  */}
          {/* <ProductCarousel products={products} title="Productos Relacionados" /> */}
          {/* } */}
        </div>
      </main>

    </div>
  )
}
