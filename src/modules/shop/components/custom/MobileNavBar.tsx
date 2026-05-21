import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router";
import { NAV_LINKS } from "@/consts/nav-link";

interface MobileNavBarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const MobileNavBar = ({
  isMenuOpen,
  setIsMenuOpen,
}: MobileNavBarProps) => {
  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="transition-smooth hover:bg-accent/10"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] px-4">
        <nav className="flex flex-col space-y-4 mt-12">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsMenuOpen(false)}
              className="w-fit text-lg hover:text-blue-950 font-medium link-underline-smooth"
            >
              {label}
            </Link>
          ))}
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
  );
};
