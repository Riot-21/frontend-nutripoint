import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/interfaces/product.interface"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"

interface ProductCarouselProps {
  products: Product[]
  title?: string
}

export function ProductCarousel({ products, title = "Productos Relacionados" }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
      setTimeout(checkScroll, 300)
    }
  }

  if (products.length === 0) return null

  return (
    <div className="relative">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">
        {title.split(" ").slice(0, -1).join(" ")} <span className="text-[#3b82f6]">{title.split(" ").slice(-1)}</span>
      </h2>

      <div className="relative group">
        {/* Left Arrow */}
        {canScrollLeft && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm border-border shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6]"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="shrink-0 w-[280px] transition-smooth hover:-translate-y-1"
            >
              <Card className="group/card overflow-hidden transition-smooth hover:shadow-xl border-border/50 h-full">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    
                    className="object-cover transition-smooth group-hover/card:scale-110"
                  />
                  {product.stock < 10 && product.stock > 0 && (
                    <Badge className="absolute top-2 right-2 bg-destructive text-white text-xs">Últimas unidades</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-xs border-[#3b82f6] text-[#3b82f6]">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold mb-2 line-clamp-2 transition-smooth group-hover/card:text-[#3b82f6]">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating) ? "fill-[#3b82f6] text-[#3b82f6]" : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm border-border shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6]"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}
