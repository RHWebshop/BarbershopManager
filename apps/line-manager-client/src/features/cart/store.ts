import { create } from "zustand";
import type { Product, CartItem } from "@line-manager/types";

interface CartState {
  items: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== productId) };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i,
        ),
      };
    }),

  clearCart: () => set({ items: [] }),
}));

export const selectTotalCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectTotalPrice = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

export const selectItemQuantity = (productId: string) => (state: CartState) => {
  const item = state.items.find((i) => i.product.id === productId);
  return item?.quantity ?? 0;
};
