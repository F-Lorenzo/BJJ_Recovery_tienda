"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStoreItem {
  key: string;
  productId: number;
  variationId?: number;
  name: string;
  slug: string;
  image?: { sourceUrl: string; altText: string };
  price: string;
  quantity: number;
  variationName?: string;
}

interface CartStore {
  items: CartStoreItem[];
  sessionToken: string | null;
  isOpen: boolean;
  setSessionToken: (token: string) => void;
  setItems: (items: CartStoreItem[]) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      sessionToken: null,
      isOpen: false,
      setSessionToken: (token) => set({ sessionToken: token }),
      setItems: (items) => set({ items }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      getItemCount: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: "bjj-cart",
      partialize: (state) => ({
        sessionToken: state.sessionToken,
        items: state.items,
      }),
    }
  )
);
