import axios from "axios";

interface UpdateQuantity {
  productId: string;
  currentQuantity: number;
}

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getProducts = async () => {
  const response = await api.get("/api/products");
  return response.data;
};

export const updateQuantity = async ({
  productId,
  currentQuantity,
}: UpdateQuantity) => {
  const response = await api.patch(`/api/products/${productId}`, {
    currentQuantity,
  });
  return response.data;
};
