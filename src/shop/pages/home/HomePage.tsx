import { CustomScreenLoading } from "@/components/custom/CustomScreenLoading";
import { Button } from "@/components/ui/button";
import { Features } from "@/shop/components/Features";
import { ProductCard } from "@/shop/components/ProductCard";
import { ShopHeroSection } from "@/shop/components/ShopHeroSection";
import { useProducts } from "@/shop/hooks/useProducts";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export const HomePage = () => {
  // const featuredProducts = mockProducts.slice(0, 8);
  // const productsRef = useRef<HTMLElement>(null);
  // const featuresRef = useRef<HTMLElement>(null);
  const { data: products, isLoading} = useProducts();

  if (isLoading) return <CustomScreenLoading></CustomScreenLoading>;


  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        <ShopHeroSection />

        <section
          id="productos"
          // ref={productsRef}
          className="container mx-auto px-4 py-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Productos <span className="text-[#2563eb]">Destacados</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Descubre nuestra selección premium de suplementos deportivos,
              diseñados para ayudarte a alcanzar tus objetivos fitness.
            </p>
          </div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            { !products || !products.content || products.content.length === 0 ? (
              <p className="text-xl justify-center">No se encontraron productos.</p>
            ) : products.content.slice(0, 6).map((product) => (
              // <div key={product.idProducto} className="product-card-animate opacity-0">
              <div key={product.idProducto} className="animate-in fade-in slide-in-from-bottom-8 duration-700"> 
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button
                size="lg"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] transition-smooth hover:scale-105 shadow-lg hover:shadow-xl px-8 py-6 text-lg"
              >
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <Features></Features>
      </main>

    </div>
  );
};
