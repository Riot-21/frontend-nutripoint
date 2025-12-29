import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { useBrandsAndCategories } from "../hooks/useBrandsAndCategories";
import { Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";

export const ShopFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { brands, categories, priceRange } = useBrandsAndCategories();

  const currentCategories = searchParams.getAll("categorias");
  const currentBrands = searchParams.getAll("marcas");

  const minParam = searchParams.get("precioMin");
  const maxParam = searchParams.get("precioMax");

  // Validar que los parámetros sean números válidos
  const isMinValid = minParam && !isNaN(Number(minParam));
  const isMaxValid = maxParam && !isNaN(Number(maxParam));

  // Prioridad: searchParams (si son válidos) → datos BD → fallback
  const currentMinPrice = isMinValid
    ? Number(minParam)
    : priceRange.data?.min ?? 0;
  const currentMaxPrice = isMaxValid
    ? Number(maxParam)
    : priceRange.data?.max ?? 500;

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(currentCategories);

  const [selectedBrands, setSelectedBrands] = useState<string[]>(currentBrands);

  const [selectedRange, setSelectedRange] = useState<[number, number]>([
    currentMinPrice,
    currentMaxPrice,
  ]);

  // Actualizar selectedRange cuando priceRange.data está disponible
  useEffect(() => {
    if (priceRange.data) {
      const minPrice = isMinValid ? Number(minParam) : priceRange.data.min;
      const maxPrice = isMaxValid ? Number(maxParam) : priceRange.data.max;
      setSelectedRange([minPrice, maxPrice]);
    }
  }, [priceRange.data, minParam, maxParam, isMinValid, isMaxValid]);

  const handleCategoriesChanged = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChanged = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const onClearFilters = () => {
    setSelectedCategories([]);
    const newSearchParams = new URLSearchParams();
    newSearchParams.delete("marcas");
    newSearchParams.delete("categorias");
    newSearchParams.delete("precioMin");
    newSearchParams.delete("precioMax");

    setSearchParams(newSearchParams);
  };

  const handleFiltersApplied = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("categorias");
    newParams.delete("marcas");
    newParams.delete("precioMin");
    newParams.delete("precioMax");

    newParams.append("precioMin", String(selectedRange[0]));
    newParams.append("precioMax", String(selectedRange[1]));

    selectedCategories.forEach((c) => {
      newParams.append("categorias", c);
    });

    selectedBrands.forEach((b) => {
      newParams.append("marcas", b);
    });

    setSearchParams(newParams);
  };

  if (!brands.data || !categories.data || !priceRange.data) {
    //! cambiar esto, link no sirve para redireccionar, deberia se navigate
    return <Link to={"/"}></Link>;
  }
  console.log("selected-range: ", selectedRange);

  return (
    <div className="space-y-6">
      {/* Categories Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categorías</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.data.map((category) => (
            <div
              // key={`cat-filter-${category.idCategory}`}
              key={category.idCategory}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={`category-${category.idCategory}`}
                checked={selectedCategories.includes(category.categoria)}
                onCheckedChange={() =>
                  handleCategoriesChanged(category.categoria)
                }
              />
              <Label
                htmlFor={`category-${category.idCategory}`}
                className="text-sm font-normal cursor-pointer hover:text-[#3b82f6] transition-smooth"
              >
                {category.categoria}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rango de Precio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            min={priceRange.data.min}
            max={priceRange.data.max}
            step={1}
            value={selectedRange}
            onValueChange={(value) =>
              setSelectedRange(value as [number, number])
            }
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">
              ${selectedRange[0].toFixed(2)}
            </span>
            <span className="text-muted-foreground">-</span>
            <span className="font-semibold">
              ${selectedRange[1].toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Brands Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Marcas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.data.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandChanged(brand)}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm font-normal cursor-pointer hover:text-[#3b82f6] transition-smooth"
              >
                {brand}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
      <Button onClick={handleFiltersApplied}>Aplicar filtros</Button>
      {/* {hasActiveFilters && ( */}
      <Button
        variant="outline"
        onClick={onClearFilters}
        className="w-full bg-transparent"
      >
        <X className="mr-2 h-4 w-4" />
        Limpiar Filtros
      </Button>
      {/* )} */}
    </div>
  );
};
