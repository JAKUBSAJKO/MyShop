export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  price_id: string;
  quantity: number;
  image: string;
  created_at: string;
  categoryId: string;
  Category: Category;
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductInBasket {
  id: string;
  name: string;
  image: string;
  price: number;
  price_id: string;
  quantity: number;
}
