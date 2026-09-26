import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { getProductById } from "@/data/products";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId?: string, colorId?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantId?: string,
    colorId?: string
  ) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

function sameLine(a: CartItem, b: CartItem) {
  return (
    a.productId === b.productId &&
    a.variantId === b.variantId &&
    a.colorId === b.colorId
  );
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => sameLine(i, item));
          if (existing) {
            return {
              items: state.items.map((i) =>
                sameLine(i, item)
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, item], isOpen: true };
        }),

      removeItem: (productId, variantId, colorId) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.productId === productId &&
                i.variantId === variantId &&
                i.colorId === colorId
              )
          ),
        })),

      updateQuantity: (productId, quantity, variantId, colorId) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (i) =>
                    !(
                      i.productId === productId &&
                      i.variantId === variantId &&
                      i.colorId === colorId
                    )
                )
              : state.items.map((i) =>
                  i.productId === productId &&
                  i.variantId === variantId &&
                  i.colorId === colorId
                    ? { ...i, quantity }
                    : i
                ),
        })),

      clearCart: () => set({ items: [] }),

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, item) => {
          const product = getProductById(item.productId);
          if (!product) return sum;
          let price = product.price;
          if (item.variantId && product.variants) {
            const variant = product.variants.find((v) => v.id === item.variantId);
            if (variant?.priceModifier) price += variant.priceModifier;
          }
          return sum + price * item.quantity;
        }, 0),
    }),
    { name: "axiom-cart" }
  )
);
