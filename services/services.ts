import axios from "axios";
import { routes } from "../routes/routes";
import { NewProduct } from "../types";

interface UpdateQuantity {
  productId: string;
  currentQuantity: number;
}

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://my-shop-peach.vercel.app";

const api = axios.create({
  baseURL,
});

export const getProducts = async () => {
  const response = await api.get("/api/products");
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("api/products/category");
  return response.data;
};

export const updateQuantity = async ({ productId, currentQuantity }: UpdateQuantity) => {
  const response = await api.patch(`/api/products/${productId}`, {
    currentQuantity,
  });
  return response.data;
};

export const deleteProduct = async (productId: string) => {
  return await api.delete(`${routes.dashboardEnd}${productId}`);
};

export const addNewProduct = async (product: NewProduct) => {
  const newProduct = await fetch(routes.addProduct, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await newProduct.json();

  return res;
};
