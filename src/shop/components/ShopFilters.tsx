import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface ProductFiltersProps {
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  selectedBrands: string[]
  onBrandsChange: (brands: string[]) => void
  onClearFilters: () => void
}

const categories = ["Proteínas", "Creatina", "Pre-Entreno", "Aminoácidos", "Vitaminas", "Quemadores"]
const brands = ["NutriPoint Pro", "Elite Performance", "Power Nutrition", "Muscle Tech"]

export const ShopFilters = ({
  selectedCategories,
  onCategoriesChange,
  priceRange,
  onPriceRangeChange,
  selectedBrands,
  onBrandsChange,
  onClearFilters,
}: ProductFiltersProps) => {
  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoriesChange([...selectedCategories, category])
    }
  }

  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandsChange(selectedBrands.filter((b) => b !== brand))
    } else {
      onBrandsChange([...selectedBrands, brand])
    }
  }

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 200

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={onClearFilters} className="w-full bg-transparent">
          <X className="mr-2 h-4 w-4" />
          Limpiar Filtros
        </Button>
      )}

      {/* Categories Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categorías</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-normal cursor-pointer hover:text-[#3b82f6] transition-smooth"
              >
                {category}
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
            min={0}
            max={200}
            step={5}
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">${priceRange[0]}</span>
            <span className="text-muted-foreground">-</span>
            <span className="font-semibold">${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Brands Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Marcas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
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
    </div>
  )
}
