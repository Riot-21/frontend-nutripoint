import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ProductCard } from "@/shop/components/ProductCard";
import { ShopFilters } from "@/shop/components/ShopFilters";
import { useProducts } from "@/shop/hooks/useProducts";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  // const query = searchParams.get("query");
  const handleClearFilters = () => {
    searchParams.delete("query");
    setSearchParams(searchParams);
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSelectedBrands([]);
    setSearchQuery("");
  };

  const { data: products } = useProducts({ retry: false });

  //   let filteredProducts = mockProducts.filter((product) => {
  //     const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
  //     const matchesSearch =
  //       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       product.description.toLowerCase().includes(searchQuery.toLowerCase())
  //     const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
  //     const matchesBrand = selectedBrands.length === 0 || selectedBrands.some((brand) => product.name.includes(brand))

  //     return matchesCategory && matchesSearch && matchesPrice && matchesBrand
  //   })

  //   if (sortBy === "price-asc") {
  //     filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  //   } else if (sortBy === "price-desc") {
  //     filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  //   } else if (sortBy === "rating") {
  //     filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
  //   } else if (sortBy === "name") {
  //     filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
  //   }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-black via-[#1a1a1a] to-black text-white py-16">
          <div className="container mx-auto px-4 text-center">
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
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 transition-smooth focus:ring-2 focus:ring-[#3b82f6]"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px] h-12">
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
                  className="md:hidden h-12 bg-transparent"
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
                  <ShopFilters
                    selectedCategories={selectedCategories}
                    onCategoriesChange={setSelectedCategories}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    selectedBrands={selectedBrands}
                    onBrandsChange={setSelectedBrands}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-4">
                <ShopFilters
                  selectedCategories={selectedCategories}
                  onCategoriesChange={setSelectedCategories}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  selectedBrands={selectedBrands}
                  onBrandsChange={setSelectedBrands}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-4 text-sm text-muted-foreground">
                Mostrando {products?.content.length || 0} de{" "}
                {products?.totalElements || 0} productos
              </div>

              {!products ? (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products?.content.map((product) => (
                    <ProductCard key={product.idProducto} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
