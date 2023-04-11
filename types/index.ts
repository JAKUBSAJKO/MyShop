export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  price_id: string;
  quantity: number;
  image: string;
  createdAt: Date;
  categoryId: string;
  Category: Category;
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductInBasket {
  priceId: string;
  quantity: number;
}
