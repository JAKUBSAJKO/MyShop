import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

import { ProductInBasket } from "../types";

interface BasketStore {
  basket: ProductInBasket[];
  addToBasket: (product: ProductInBasket) => void;
  removeFromBasket: (product: ProductInBasket) => void;
  cleanBasket: () => void;
}

export const useBasketStore = create<BasketStore>()((set) => ({
  basket: [],
  addToBasket: (product: ProductInBasket) =>
    set((state) => ({
      basket: [...state.basket, product],
    })),
  removeFromBasket: (product: ProductInBasket) =>
    set((state) => ({
      basket: state.basket.filter((prod) => prod.priceId !== product.priceId),
    })),
  cleanBasket: () =>
    set({
      basket: [],
    }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("BasketStore", useBasketStore);
}
