import { Dispatch, SetStateAction, useState } from "react";

import { Product, ProductInBasket } from "../../types";
import { useBasketStore } from "../../stories/store";
import { stat } from "fs";

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

  const addProductToBasket = (priceId: string) => {
    const product = {
      priceId,
      quantity: quantityOfProduct,
    };

    const productExistInBasket = basket.find(
      (productInBasket) => productInBasket.priceId === product.priceId
    );

    if (productExistInBasket) {
      removeFromBasket(product);
      addToBasket({
        priceId,
        quantity: productExistInBasket.quantity + product.quantity,
      });
    } else {
      addToBasket(product);
    }

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
        </div>
        <div className="card-actions justify-end">
          <button
            onClick={() => addProductToBasket(product.price_id)}
            className="btn btn-primary"
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
}
