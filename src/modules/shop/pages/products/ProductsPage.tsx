import { CustomScreenLoading } from "@/components/custom/CustomScreenLoading";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Pagination } from "@/components/custom/Pagination";
import { ProductCard } from "@/modules/shop/components/ProductCard";
import { ShopFilters } from "@/modules/shop/components/ShopFilters";
import { useProducts } from "@/modules/shop/hooks/useProducts";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

const SORT_MAP: Record<string, { sortBy: string; direction: "asc" | "desc" }> =
  {
    featured: { sortBy: "idProducto", direction: "asc" },
    "price-asc": { sortBy: "precioUnit", direction: "asc" },
    "price-desc": { sortBy: "precioUnit", direction: "desc" },
    // rating: { sortBy: "rating", direction: "desc" },
    name: { sortBy: "nombre", direction: "asc" },
  };

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortByParam = searchParams.get("sortBy");
  const directionParam = searchParams.get("direction");
  const initialSort =
    Object.entries(SORT_MAP).find(
      ([_, v]) => v.sortBy === sortByParam && v.direction === directionParam,
    )?.[0] ?? "featured";
  const [sortBy, setSortBy] = useState(initialSort);

  const handleSortChange = (value: string) => {
    setSortBy(value);

    const sortConfig = SORT_MAP[value];
    if (!sortConfig) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", sortConfig.sortBy);
    newParams.set("direction", sortConfig.direction);
    newParams.delete("page");
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  const updateParams = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  const handleChangePage = (nextPage: number) => {
    updateParams(nextPage - 1);
  };

  const { data: products, isLoading } = useProducts({ retry: false });

  if (isLoading) {
    return <CustomScreenLoading></CustomScreenLoading>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-black via-[#1a1a1a] to-black text-white py-16 ">
          <div className="container mx-auto px-4 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Todos Nuestros <span className="text-[#3b82f6]">Productos</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto text-pretty">
              Explora nuestra colección completa de suplementos deportivos
              premium
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="container mx-auto px-4 py-12">
          {/* Search and Sort Bar */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-items-center">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full md:w-[200px] h-12 animate-fade-in">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Destacados</SelectItem>
                <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-desc">
                  Precio: Mayor a Menor
                </SelectItem>
                <SelectItem value="rating">Mejor Valorados</SelectItem>
                <SelectItem value="name">Nombre A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden bg-transparent animate-fade-in"
                >
                  <SlidersHorizontal className="mr-2 h-5 w-5" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ShopFilters />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-4 p-4 animate-fade-in">
                <ShopFilters />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 animate-fade-in">
              <div className="mb-4 text-sm text-muted-foreground">
                Mostrando {products?.content.length || 0} de{" "}
                {products?.totalElements || 0} productos
              </div>

              {!products || products?.content.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No se encontraron productos con los filtros seleccionados.
                  </p>
                  <Button
                    onClick={handleClearFilters}
                    className="mt-4 bg-transparent"
                    variant="outline"
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {products?.content.map((product) => (
                      <ProductCard key={product.idProducto} product={product} />
                    ))}
                  </div>
                  <Pagination
                    totalItems={products.totalElements}
                    itemsPerPage={products.size}
                    currentPage={products.number + 1}
                    onChangePage={handleChangePage}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
