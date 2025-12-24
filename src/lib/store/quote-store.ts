import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuoteItem } from '@/types';

interface QuoteStore {
  items: QuoteItem[];
  addItem: (product: { id: string; name: string; slug: string; image?: string }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearQuote: () => void;
  getItemCount: () => number;
  isInQuote: (productId: string) => boolean;
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                productName: product.name,
                productSlug: product.slug,
                productImage: product.image,
                quantity: 1,
              },
            ],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearQuote: () => set({ items: [] }),

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      isInQuote: (productId) =>
        get().items.some((i) => i.productId === productId),
    }),
    { name: 'quote-storage' }
  )
);
