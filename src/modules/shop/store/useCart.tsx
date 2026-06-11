import type { CartItem } from "@/interfaces/product.interface";
import type { ProductInterface } from "@/modules/shop/interfaces/products-response.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartItem[];
  addItem: (product: ProductInterface, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  total: number;
  itemCount: number;
}

const calculate = (items: CartItem[]) => ({
  items,
  total: items.reduce((sum, i) => sum + i.product.preciounit * i.quantity, 0),
  itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
});

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.product.idProducto === product.idProducto,
        );

        let newItems: CartItem[];

        if (existing) {
          newItems = items.map((i) =>
            i.product.idProducto === product.idProducto
              ? {
                  ...i,
                  quantity: Math.min(i.quantity + quantity, product.stock),
                }
              : i,
          );
        } else {
          newItems = [
            ...items,
            { product, quantity: Math.min(quantity, product.stock) },
          ];
        }

        set(calculate(newItems));
      },

      removeItem: (productId) => {
        const newItems = get().items.filter(
          (i) => i.product.idProducto !== productId,
        );
        set(calculate(newItems));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const newItems = get().items.map((i) =>
          i.product.idProducto === productId
            ? {
                ...i,
                quantity: Math.min(quantity, i.product.stock),
              }
            : i,
        );

        set(calculate(newItems));
      },

      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
    }),
    { name: "shopping-cart" },
  ),
);
