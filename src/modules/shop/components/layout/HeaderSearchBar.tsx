import { useEffect, useState, type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { useProducts } from "@/modules/shop/hooks/useProducts";
import { currencyFormatter } from "@/lib/currency-formatter";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { sortProducts } from "@/modules/shop/utils/sort-products";

interface HeaderSearchBarProps {
  className?: string;
  onSearchComplete?: () => void;
}

export const HeaderSearchBar = ({
  // className,
  onSearchComplete,
}: HeaderSearchBarProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);

  // Debounce search query
  useEffect(() => {
    if (query.trim().length === 0) {
      setDebouncedQuery("");
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

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    // e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set("query", trimmed);
    newParams.delete("page");
    navigate({
      pathname: "/products",
      search: newParams.toString(),
    });
    setTimeout(() => {
      setQuery("");
      setDebouncedQuery("");
    }, 0);
    setOpen(false);
    onSearchComplete?.();
  };

  const handleClear = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("query");
    setSearchParams(newParams);
    setQuery("");
    setDebouncedQuery("");
    setOpen(false);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, "gi");

    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={index}
          className="bg-yellow-300/40 dark:bg-yellow-500/30 font-semibold rounded-sm"
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const sortedProducts = sortProducts(data.content, debouncedQuery);

  const isTyping = query.trim() !== debouncedQuery;
  const showLoading = isFetching || isLoading || isTyping;
  const showResults = !showLoading && data.content.length > 0;
  const showNoResults =
    !showLoading && debouncedQuery.length > 0 && data.content.length === 0;

  return (
    <div className="w-full md:w-[400px] flex flex-col gap-4">
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="w-full justify-start text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Buscar productos...
        </div>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) {
            setQuery("");
            setDebouncedQuery("");
          }
        }}
        className="backdrop-blur-xl"
      >
        <Command shouldFilter={false} loop={true}>
          <CommandInput
            placeholder="Buscar productos..."
            value={query}
            onValueChange={(value) => {
              setQuery(value);
            }}
            onKeyDownCapture={handleSearch}
          />

          <CommandList className={"max-h-[500px]"}>
            {/* LOADING */}
            {showLoading && (
              <div className="p-6 text-center text-sm text-muted-foreground">
                Cargando...
              </div>
            )}

            {/* EMPTY */}
            {showNoResults && (
              <div className="animate-fade-in">
                <CommandEmpty>No se encontraron productos</CommandEmpty>
              </div>
            )}

            {/* RESULTS */}
            {showResults && (
              <div className="animate-fade-in">
                <CommandGroup heading="Productos">
                  <CommandItem value="__empty__" className="hidden" />
                  {/* {data.content.map((product) => ( */}
                  {sortedProducts.map((product) => (
                    <CommandItem
                      key={product.idProducto}
                      value={product.nombre}
                      onSelect={() => {
                        navigate(`/products/${product.idProducto}`);
                        setOpen(false);
                        handleClear();
                        onSearchComplete?.();
                      }}
                      className="cursor-pointer transition-colors duration-100"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="relative w-12 h-12 shrink-0 bg-muted rounded-md overflow-hidden">
                          <img
                            src={
                              product.imagenes[0]?.url || "/placeholder.svg"
                            }
                            alt={product.nombre}
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {/* {product.nombre} */}
                            {highlightMatch(product.nombre, debouncedQuery)}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {product.marca}
                          </p>
                        </div>

                        <div className="font-bold">
                          {currencyFormatter(product.preciounit)}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};
