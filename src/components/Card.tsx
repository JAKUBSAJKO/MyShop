import { useState } from "react";

import { Product } from "../../types";
import { useBasketStore } from "../../stories/store";
import { prisma } from "../../server/db/client";
import { headers } from "next/dist/client/components/headers";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  const basket = useBasketStore((state) => state.basket);
  const addToBasket = useBasketStore((state) => state.addToBasket);
  const removeFromBasket = useBasketStore((state) => state.removeFromBasket);

  const [quantityOfProduct, setQuantityOfProduct] = useState(0);

  const addQuantity = () => {
    setQuantityOfProduct((prev) => prev + 1);
  };

  const substractQuantity = () => {
    setQuantityOfProduct((prev) => prev - 1);
  };

  const addProductToBasket = () => {
    const productToBasket = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      price_id: product.price_id,
      quantity: quantityOfProduct,
    };

    const productExistInBasket = basket.find(
      (productInBasket) => productInBasket.price_id === productToBasket.price_id
    );

    if (productExistInBasket) {
      removeFromBasket(productToBasket);
      addToBasket({
        ...productToBasket,
        quantity: productExistInBasket.quantity + productToBasket.quantity,
      });
    } else {
      addToBasket(productToBasket);
    }

    setQuantityOfProduct(0);
  };

  const updateQuantityInDB = async () => {
    const currentQuantity: number = product.quantity - quantityOfProduct;

    await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      body: JSON.stringify(currentQuantity),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setQuantityOfProduct(0);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="bg-white">
        <img src={product.image} alt={product.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          <div className="badge">{product.Category.name.toUpperCase()}</div>
        </h2>
        <p>{product.description}</p>
        <h3 className="card-title">{product.price} zł</h3>
        <div className="w-36 flex justify-center items-center">
          <button
            onClick={substractQuantity}
            disabled={quantityOfProduct === 0}
            className="btn btn-circle text-xl"
          >
            -
          </button>
          <p className="text-center">{quantityOfProduct}</p>
          <button
            onClick={addQuantity}
            disabled={quantityOfProduct === product.quantity}
            className="btn btn-circle text-xl"
          >
            +
          </button>
          <button onClick={updateQuantityInDB}>Check</button>
        </div>
        <div className="card-actions justify-end">
          <button onClick={addProductToBasket} className="btn btn-primary">
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
}
