import { Button } from "@/components/ui/button";
import type { ProductsResponse } from "@/interfaces/products.interface";
import { mockProducts } from "@/mocks/product.mock";
import { getProductsAction } from "@/shop/actions/get-products.action";
import { ProductCard } from "@/shop/components/ProductCard";
import { ShopFooter } from "@/shop/components/ShopFooter";
import { ShopHeader } from "@/shop/components/ShopHeader";
import { ShopHeroSection } from "@/shop/components/ShopHeroSection";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const HomePage = () => {
  const featuredProducts = mockProducts.slice(0, 8);
  const productsRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
    const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsAction({});
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate-in",
            "fade-in",
            "slide-in-from-bottom-8",
            "duration-700"
          );
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const productCards = document.querySelectorAll(".product-card-animate");
    const featureCards = document.querySelectorAll(".feature-card-animate");

    productCards.forEach((card, index) => {
      setTimeout(() => {
        observer.observe(card);
      }, index * 50);
    });

    featureCards.forEach((card, index) => {
      setTimeout(() => {
        observer.observe(card);
      }, index * 100);
    });

    return () => observer.disconnect();
  }, []);

    if (loading) return <p className="text-center">Cargando productos...</p>;

  if (!products) return <p>No se encontraron productos.</p>;


  return (
    <div className="min-h-screen flex flex-col">
      <ShopHeader />

      <main className="flex-1">
        <ShopHeroSection />

        <section
          id="productos"
          ref={productsRef}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {products.content.map((product) => (
              <div key={product.idProducto} className="product-card-animate">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/productos">
              <Button
                size="lg"
                className="bg-[#2563eb] hover:bg-[#1d4ed8] transition-smooth hover:scale-105 shadow-lg hover:shadow-xl px-8 py-6 text-lg"
              >
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </section>

        <section
          ref={featuresRef}
          className="bg-linear-to-b from-muted/50 to-background py-20"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Por qué elegir{" "}
                <span className="text-[#2563eb]">NutriPoint</span>?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Comprometidos con tu salud y rendimiento deportivo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="feature-card-animate text-center group p-6 rounded-xl bg-card border border-border/50 transition-smooth hover:shadow-xl hover:-translate-y-1">
                <div className="w-20 h-20 bg-linear-to-br from-[#2563eb] to-[#1d4ed8] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-smooth group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-[#2563eb] transition-smooth">
                  Calidad Certificada
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Todos nuestros productos cuentan con certificaciones
                  internacionales y pruebas de laboratorio
                </p>
              </div>

              <div className="feature-card-animate text-center group p-6 rounded-xl bg-card border border-border/50 transition-smooth hover:shadow-xl hover:-translate-y-1">
                <div className="w-20 h-20 bg-linear-to-br from-[#dc2626] to-[#b91c1c] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-smooth group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-[#dc2626] transition-smooth">
                  Envío Rápido
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Entrega en 24-48 horas en toda la península con seguimiento en
                  tiempo real
                </p>
              </div>

              <div className="feature-card-animate text-center group p-6 rounded-xl bg-card border border-border/50 transition-smooth hover:shadow-xl hover:-translate-y-1">
                <div className="w-20 h-20 bg-linear-to-br from-[#2563eb] to-[#1d4ed8] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-smooth group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-[#2563eb] transition-smooth">
                  Compra Segura
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pago 100% seguro con encriptación SSL y garantía de devolución
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ShopFooter />
    </div>
  );
};
