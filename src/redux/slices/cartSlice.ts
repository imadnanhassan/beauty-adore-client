import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  variant?: string;
  inStock: boolean;
}

interface CartState {
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  itemCount: number;
  promoCode: string | null;
  promoDiscount: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  itemCount: 0,
  promoCode: null,
  promoDiscount: 0,
};

const calculateTotals = (state: CartState) => {
  state.subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate shipping (free over $50)
  state.shipping = state.subtotal > 50 ? 0 : 5.99;

  // Apply promo discount
  const discountAmount = state.promoCode
    ? (state.subtotal * state.promoDiscount) / 100
    : 0;

  // Calculate tax (8% on discounted subtotal)
  state.tax = (state.subtotal - discountAmount) * 0.08;

  // Calculate total
  state.total = state.subtotal - discountAmount + state.shipping + state.tax;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Omit<CartItem, "quantity">;
        quantity: number;
      }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === product.id && item.variant === product.variant
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }

      calculateTotals(state);
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; variant?: string }>
    ) => {
      const { id, variant } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.variant === variant)
      );
      calculateTotals(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; variant?: string; quantity: number }>
    ) => {
      const { id, variant, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.variant === variant
      );

      if (item) {
        item.quantity = quantity;
        calculateTotals(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      calculateTotals(state);
    },

    applyPromoCode: (
      state,
      action: PayloadAction<{ code: string; discount: number }>
    ) => {
      state.promoCode = action.payload.code;
      state.promoDiscount = action.payload.discount;
      calculateTotals(state);
    },

    removePromoCode: (state) => {
      state.promoCode = null;
      state.promoDiscount = 0;
      calculateTotals(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyPromoCode,
  removePromoCode,
} = cartSlice.actions;
export default cartSlice.reducer;
