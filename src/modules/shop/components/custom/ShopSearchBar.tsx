import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useProducts } from "@/modules/shop/hooks/useProducts";
import { currencyFormatter } from "@/lib/currency-formatter";
import { cn } from "@/lib/utils";

interface ShopSearchBarProps {
  className?: string;
  onSearchComplete?: () => void;
}

export const ShopSearchBar = ({
  className,
  onSearchComplete,
}: ShopSearchBarProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Sync query with URL
  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam === null) {
      setQuery("");
      setDebouncedQuery(""); // Clear debounced as well to prevent re-trigger
    } else if (queryParam !== query) {
      setQuery(queryParam);
      setDebouncedQuery(queryParam);
    }
  }, [searchParams]);

  // Debounce search query
  useEffect(() => {
    if (query.trim().length === 0) {
      setDebouncedQuery("");
      setIsSearchOpen(false); // Close immediately
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Fetch products
  const {
    data = { content: [] },
    isFetching,
    isLoading,
  } = useProducts({
    queryInput: debouncedQuery,
    enabled: debouncedQuery.length > 0,
    retry: false,
  });

  // Open search results when query changes or when clicking input
  useEffect(() => {
    if (submitted) return;

    if (debouncedQuery.length > 0) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [debouncedQuery, submitted]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const trimmed = query.trim();
    if (!trimmed) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set("query", trimmed);
    newParams.delete("page");
    navigate({
      pathname: "/products",
      search: newParams.toString(),
    });

    setSubmitted(true);
    setIsSearchOpen(false);
    onSearchComplete?.();
  };

  const handleClear = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("query");
    setSearchParams(newParams);
    setQuery("");
    setDebouncedQuery("");
    setIsSearchOpen(false);
  };

  const isTyping = query.trim() !== debouncedQuery;
  const showLoading = isFetching || isLoading || isTyping;
  const showResults = !showLoading && data.content.length > 0;
  const showNoResults =
    !showLoading && debouncedQuery.length > 0 && data.content.length === 0;

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
        <Input
          type="search"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSubmitted(false);
            if (e.target.value.trim().length > 0) setIsSearchOpen(true);
          }}
          onKeyDown={handleSearch}
          onFocus={() => {
            if (query.trim().length > 0) setIsSearchOpen(true);
          }}
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

      {isSearchOpen && (
        <>
          {/* Loading State */}
          {showLoading && (
            <Card className="absolute top-full mt-2 w-full shadow-lg border-border/50 animate-in fade-in-0 zoom-in-95 duration-200 z-50">
              <div className="p-4 text-center text-sm text-muted-foreground">
                Cargando...
              </div>
            </Card>
          )}

          {/* No Results State */}
          {showNoResults && (
            <Card className="absolute top-full mt-2 w-full shadow-lg border-border/50 animate-in fade-in-0 zoom-in-95 duration-200 z-50">
              <div className="p-4 text-center text-sm text-muted-foreground">
                No se encontraron resultados
              </div>
            </Card>
          )}

          {/* Results List */}
          {showResults && (
            <Card className="absolute top-full mt-2 w-full max-h-[400px] overflow-y-auto shadow-lg border-border/50 animate-in fade-in-0 zoom-in-95 duration-200 z-50">
              <div className="p-2">
                {data.content.map((product) => (
                  <Link
                    key={`search-${product.idProducto}`}
                    to={`/products/${product.idProducto}`}
                    onClick={() => {
                      setIsSearchOpen(false);
                      handleClear();
                      onSearchComplete?.();
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/40 transition-smooth text-blue-900"
                  >
                    <div className="relative w-12 h-12 shrink-0 bg-muted rounded-md overflow-hidden">
                      <img
                        src={product.imagenesUrls?.[0] || "/placeholder.svg"}
                        alt={product.nombre}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {product.nombre}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.marca}
                      </p>
                    </div>
                    <div className="text-sm font-bold text-accent-foreground">
                      {currencyFormatter(product.preciounit)}
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
