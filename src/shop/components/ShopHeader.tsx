import { Input } from "@/components/ui/input"
import type { Product } from "@/interfaces/product.interface"
import { mockProducts } from "@/mocks/product.mock"
import { useEffect, useRef, useState } from "react"
import { User, Search, Menu, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export const ShopHeader = () => {
//   const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const pathname = usePathname()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const isActive = (path: string) => {
    // if (path === "/" && pathname === "/") return true
    // if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.brand?.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
      setIsSearchOpen(true)
    } else {
      setResults([])
      setIsSearchOpen(false)
    }
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsSearchOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 transition-smooth hover:opacity-80">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-foreground font-montserrat">Nutri</span>
              <span className="text-3xl font-bold text-blue-950 font-montserrat">Point</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a
              href="/productos"
              className={`px-4 py-2 text-sm transition-smooth relative group ${
                isActive("/productos")
                  ? "font-bold text-foreground"
                  : "font-medium text-foreground/70 hover:text-foreground hover:font-bold"
              }`}
            >
              Productos
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transition-smooth ${
                  isActive("/productos") ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </a>
            <a
              href="/about"
              className={`px-4 py-2 text-sm transition-smooth relative group ${
                isActive("/about")
                  ? "font-bold text-foreground"
                  : "font-medium text-foreground/70 hover:text-foreground hover:font-bold"
              }`}
            >
              Nosotros
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transition-smooth ${
                  isActive("/about") ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </a>
            <a
              href="/contact"
              className={`px-4 py-2 text-sm transition-smooth relative group ${
                isActive("/contact")
                  ? "font-bold text-foreground"
                  : "font-medium text-foreground/70 hover:text-foreground hover:font-bold"
              }`}
            >
              Contacto
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transition-smooth ${
                  isActive("/contact") ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </a>
          </nav>

          {/* Search Bar - Desktop */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-sm mx-6 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10 transition-smooth focus:ring-2 focus:ring-accent"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth z-10"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {isSearchOpen && results.length > 0 && (
              <Card className="absolute top-full mt-2 w-full max-h-[400px] overflow-y-auto shadow-lg border-border/50 animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="p-2">
                  {results.map((product) => (
                    <a
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => {
                        setIsSearchOpen(false)
                        setQuery("")
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-smooth"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <div className="text-sm font-bold text-accent">${product.price}</div>
                    </a>
                  ))}
                </div>
              </Card>
            )}

            {isSearchOpen && query && results.length === 0 && (
              <Card className="absolute top-full mt-2 w-full shadow-lg border-border/50 animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="p-4 text-center text-sm text-muted-foreground">No se encontraron productos</div>
              </Card>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            {/* {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">Hola, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="transition-smooth hover:bg-accent/10">
                  Salir
                </Button>
              </div>
            ) : (
              <a href="/login">
                <Button variant="ghost" size="icon" className="transition-smooth hover:bg-accent/10 hover:scale-110">
                  <User className="h-5 w-5" />
                </Button>
              </a>
            )} */}

{/*!!REVISAR */}
            {/* <CartSidebar /> */}

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="transition-smooth hover:bg-accent/10">
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <a
                    href="/productos"
                    className="text-lg font-medium transition-smooth hover:text-accent hover:font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Productos
                  </a>
                  <a
                    href="/about"
                    className="text-lg font-medium transition-smooth hover:text-accent hover:font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Nosotros
                  </a>
                  <a
                    href="/contact"
                    className="text-lg font-medium transition-smooth hover:text-accent hover:font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contacto
                  </a>
                  {/* {user && (
                    <>
                      <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground mb-2">Hola, {user.name}</p>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => {
                            logout()
                            setIsMenuOpen(false)
                          }}
                        >
                          Cerrar Sesión
                        </Button>
                      </div>
                    </>
                  )} */}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div ref={searchRef} className="relative w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10 transition-smooth focus:ring-2 focus:ring-accent"
              />
              {query && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth z-10"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {isSearchOpen && results.length > 0 && (
              <Card className="absolute top-full mt-2 w-full max-h-[300px] overflow-y-auto shadow-lg border-border/50 animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="p-2">
                  {results.map((product) => (
                    <a
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => {
                        setIsSearchOpen(false)
                        setQuery("")
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-smooth"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <div className="text-sm font-bold text-accent">${product.price}</div>
                    </a>
                  ))}
                </div>
              </Card>
            )}

            {isSearchOpen && query && results.length === 0 && (
              <Card className="absolute top-full mt-2 w-full shadow-lg border-border/50 animate-in fade-in-0 zoom-in-95 duration-200">
                <div className="p-4 text-center text-sm text-muted-foreground">No se encontraron productos</div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
