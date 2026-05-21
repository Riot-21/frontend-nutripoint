import { useEffect } from "react";
import { useLocation } from "react-router";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
  const timeout = setTimeout(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, 10);

  return () => clearTimeout(timeout);
}, [pathname]);

  return null;
};
