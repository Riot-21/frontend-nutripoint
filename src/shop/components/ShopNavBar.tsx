import { NavLink } from "react-router";

export const ShopNavbar = () => {
  return (
    <nav className="hidden md:flex items-center space-x-5">
      {[
        { to: "/products", label: "Productos" },
        { to: "/about", label: "Nosotros" },
        { to: "/contact", label: "Contacto" },
      ].map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `relative px-4 py-2 text-sm text-accent-foreground transition-all group
            ${
              isActive
                ? "text-foreground font-extrabold"
                : "text-foreground/70 hover:text-foreground"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span>{label}</span>
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transition-all duration-300 origin-left
                  ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                `}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

