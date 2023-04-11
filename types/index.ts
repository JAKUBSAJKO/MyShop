export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  priceId: string;
  image: string;
  createdAt: Date;
  categoryId: string;
  Category: Category;
}

export interface Category {
  id: string;
  name: string;
}
