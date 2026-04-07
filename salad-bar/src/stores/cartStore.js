import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],

  addItem: (salad, quantity = 1, extras = { toppings: [], dressing: null }) => {
    set((state) => {
      const key = `${salad.id}-${extras.toppings.sort().join(',')}-${extras.dressing}`;
      const existing = state.items.find((item) => item.key === key);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      const toppingsTotal = extras.toppings.reduce((sum, t) => sum + t.price, 0);
      const itemPrice = salad.price + toppingsTotal;

      return {
        items: [
          ...state.items,
          {
            key,
            salad,
            quantity,
            extras,
            itemPrice,
          },
        ],
      };
    });
  },

  removeItem: (key) => {
    set((state) => ({
      items: state.items.filter((item) => item.key !== key),
    }));
  },

  updateQuantity: (key, quantity) => {
    if (quantity <= 0) {
      get().removeItem(key);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.key === key ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce(
      (sum, item) => sum + item.itemPrice * item.quantity,
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
