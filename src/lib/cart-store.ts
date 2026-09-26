import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { getProductById } from "@/data/products";

interface CustomLotPayload {
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
    name: string;
  }[];
  discountPercent: number;
  subtotal: number;
  total: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  addCustomLot: (lot: CustomLotPayload) => void;
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
  if (a.customLot || b.customLot) return false;
  return (
    a.productId === b.productId &&
    a.variantId === b.variantId &&
    a.colorId === b.colorId
  );
}

function lineTotal(item: CartItem): number {
  if (item.customLot) {
    return item.customLot.total * item.quantity;
  }
  const product = getProductById(item.productId);
  if (!product) return 0;
  let price = product.price;
  if (item.variantId && product.variants) {
    const variant = product.variants.find((v) => v.id === item.variantId);
    if (variant?.priceModifier) price += variant.priceModifier;
  }
  return price * item.quantity;
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

      addCustomLot: (lot) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              productId: `custom-lot-${Date.now()}`,
              quantity: 1,
              customLot: {
                id: `lot-${Date.now()}`,
                ...lot,
              },
            },
          ],
          isOpen: true,
        })),

      removeItem: (productId, variantId, colorId) =>
        set((state) => ({
          items: state.items.filter((i) => {
            if (i.customLot) return i.productId !== productId;
            return !(
              i.productId === productId &&
              i.variantId === variantId &&
              i.colorId === colorId
            );
          }),
        })),

      updateQuantity: (productId, quantity, variantId, colorId) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => {
                  if (i.customLot) return i.productId !== productId;
                  return !(
                    i.productId === productId &&
                    i.variantId === variantId &&
                    i.colorId === colorId
                  );
                })
              : state.items.map((i) => {
                  if (i.customLot && i.productId === productId) {
                    return { ...i, quantity };
                  }
                  if (
                    i.productId === productId &&
                    i.variantId === variantId &&
                    i.colorId === colorId
                  ) {
                    return { ...i, quantity };
                  }
                  return i;
                }),
        })),

      clearCart: () => set({ items: [] }),

      getItemCount: () =>
        get().items.reduce((sum, item) => {
          if (item.customLot) {
            const lotQty = item.customLot.items.reduce(
              (s, l) => s + l.quantity,
              0
            );
            return sum + lotQty * item.quantity;
          }
          return sum + item.quantity;
        }, 0),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + lineTotal(item), 0),
    }),
    { name: "axiom-cart" }
  )
);
