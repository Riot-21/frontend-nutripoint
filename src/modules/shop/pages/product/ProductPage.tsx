import { CustomScreenLoading } from "@/components/custom/CustomScreenLoading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currencyFormatter } from "@/lib/currency-formatter";
// import { mockProducts } from "@/mocks/product.mock";
// import { mockProducts } from "@/mocks/product.mock"
import { ProductActions } from "@/modules/shop/components/product/ProductActions";
import { ProductCarousel } from "@/modules/shop/components/product/ProductCarousel";
// import { ProductCarousel } from "@/shop/components/product-details/ProductCarousel"
import { useProductById } from "@/modules/shop/hooks/useProductById";
import { useState } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Package, Shield, Star, Truck, X } from "lucide-react";
import { Link, Navigate, useParams } from "react-router";

export const ProductPage = () => {
  // const resolvedParams = await params
  const { id } = useParams();
  // const navigate = useNavigate();

  const { data, isError, isLoading } = useProductById(Number(id));
  const product = data?.product;
  const relatedProducts = data?.relatedProducts;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  // const product = mockProducts.find((p) => p.id === id)

  if (isLoading) {
    return <CustomScreenLoading></CustomScreenLoading>;
  }

  if (isError || !product) {
    //navigate() se usa dentro de handlers-funciones
    // navigate('/products')
    //replace para evitar volver atras y estar en la apgina con error
    return <Navigate to={"/products"} replace></Navigate>;
  }

  // const relatedProducts = mockProducts.slice(0, 6);

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
            <Link
              to="/products"
              className="hover:text-foreground transition-smooth"
            >
              Productos
            </Link>
            <span>/</span>

            <span className="text-foreground">{product.nombre}</span>
          </div>

          {/* Back Button */}
          <Link to="/products">
            <Button className="mb-6 -ml-4 bg-transparent text-black hover:bg-transparent hover:text-blue-900 transition-all duration-300 animate-fade-in">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Productos
            </Button>
          </Link>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 lg:items-center animate-fade-in">
            {/* Product Image */}
            <div className="space-y-4 max-w-lg lg:max-w-none mx-auto w-full">
              <div 
                className="relative aspect-square rounded-lg overflow-hidden bg-muted group cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  key={activeImageIndex}
                  src={product.imagenes[activeImageIndex]?.url || "/placeholder.svg"}
                  alt={product.nombre}
                  className="object-cover w-full h-full transition-transform duration-300 ease-in-out animate-fade-in hover:scale-105"
                />
                
                {/* Flechas de navegación (solo si hay más de 1 imagen) */}
                {product.imagenes.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) =>
                          prev === 0 ? product.imagenes.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) =>
                          prev === product.imagenes.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {product.stock < 10 && product.stock > 0 && (
                  <Badge className="absolute top-4 right-4 bg-destructive text-white">
                    Últimas unidades
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge className="absolute top-4 right-4 bg-secondary text-white">
                    Agotado
                  </Badge>
                )}
              </div>

              {/* Miniaturas (Thumbnails) */}
              {product.imagenes.length > 1 && (
                <div className="flex gap-4 overflow-x-auto py-2 px-2 items-center justify-center">
                  {product.imagenes.map((image, idx) => (
                    <button
                      key={image.idImage}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 shrink-0 rounded-md overflow-hidden bg-muted border-2 transition-all duration-300 ${
                        activeImageIndex === idx
                          ? "border-[#3b82f6] scale-105 shadow-md"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${product.nombre} thumbnail ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge
                  variant="outline"
                  className="mb-3 border-[#3b82f6] text-[#3b82f6]"
                >
                  {product.marca}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {product.nombre}
                </h1>

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

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.stock)
                            ? "fill-[#3b82f6] text-[#3b82f6]"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stock} ({product.stock} reseñas)
                  </span>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {product.descripcion}
                </p>
              </div>

              <Separator />

              {/* Price */}
              <div>
                <div className="flex flex-col md:flex-row items-baseline space-x-3 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    {currencyFormatter(product.preciounit)}
                  </span>
                  <span className="text-muted-foreground">IVA incluido</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Envío gratis en pedidos superiores a $50
                </p>
              </div>

              <Separator />

              {/* Benefits */}
              <div>
                <h3 className="font-semibold mb-3">Beneficios Principales:</h3>
                <ul className="space-y-2">
                  {product.categorias.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-[#3b82f6] shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <ProductActions product={product} />

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="border-border/50 transition-smooth hover:shadow-2xl">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-full flex items-center justify-center shrink-0">
                      <Truck className="h-5 w-5 text-[#3b82f6]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Envío Rápido</p>
                      <p className="text-xs text-muted-foreground">
                        24-48 horas
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 transition-smooth hover:shadow-2xl">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#3b82f6]/10 rounded-full flex items-center justify-center shrink-0">
                      <Shield className="h-5 w-5 text-[#3b82f6]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Compra Segura</p>
                      <p className="text-xs text-muted-foreground">
                        100% protegida
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Card className="mb-6 h-auto border-none shadow-none">
            <CardContent className="p-4">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="description"
                    className="transition-all duration-300 ease-in-out"
                  >
                    Descripción
                  </TabsTrigger>
                  <TabsTrigger
                    value="ingredients"
                    className="transition-all duration-300 ease-in-out"
                  >
                    Ingredientes
                  </TabsTrigger>
                  <TabsTrigger
                    value="usage"
                    className="transition-all duration-300 ease-in-out"
                  >
                    Modo de Uso
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <div className="prose prose-sm max-w-none animate-fade-in">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.descripcion}
                    </p>
                    <h4 className="font-semibold mt-4 mb-2">
                      Beneficios Detallados:
                    </h4>
                    <ul className="space-y-2">
                      {product.categorias.map((benefit, index) => (
                        <li key={index} className="text-muted-foreground">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="ingredients" className="mt-6">
                  <div className="prose prose-sm max-w-none animate-fade-in">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.modEmpleo ||
                        "Información de ingredientes no disponible."}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="usage" className="mt-6">
                  <div className="prose prose-sm max-w-none animate-fade-in">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.advert || "Información de uso no disponible."}
                    </p>
                    <div className=" p-4 rounded-lg mt-4">
                      <p className="text-sm font-semibold mb-2">
                        Recomendaciones:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • Consulta con un profesional de la salud antes de
                          usar
                        </li>
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

          {relatedProducts && (
            // <div className="items-center justify-items-center">
              <ProductCarousel
                products={relatedProducts}
                title="Productos Relacionados"
              />
            // </div>
          )}
        </div>
      </main>

      {/* Ventana modal (Lightbox) al hacer clic en la imagen */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50 p-2"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>

          {/* Flecha Izquierda */}
          {product.imagenes.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) =>
                  prev === 0 ? product.imagenes.length - 1 : prev - 1
                );
              }}
              className="absolute left-6 text-white hover:text-gray-300 transition-colors w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 z-50"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Imagen Ampliada */}
          <div 
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={activeImageIndex}
              src={product.imagenes[activeImageIndex]?.url || "/placeholder.svg"}
              alt={product.nombre}
              className="max-w-full max-h-[85vh] object-contain rounded-md animate-fade-in"
            />
          </div>

          {/* Flecha Derecha */}
          {product.imagenes.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) =>
                  prev === product.imagenes.length - 1 ? 0 : prev + 1
                );
              }}
              className="absolute right-6 text-white hover:text-gray-300 transition-colors w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 z-50"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
