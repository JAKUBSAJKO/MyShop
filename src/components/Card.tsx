import { useState } from "react";

import { Product } from "../../types";
import { useBasketStore } from "../../stories/store";
import { useMutation, useQueryClient } from "react-query";
import { updateQuantity } from "../../services/services";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  const queryClient = useQueryClient();

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

    updateQuantityInDB();
  };

  const { mutate, isLoading } = useMutation(updateQuantity, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      setQuantityOfProduct(0);
    },
  });

  const updateQuantityInDB = async () => {
    const currentQuantity: number = product.quantity - quantityOfProduct;
    mutate({ productId: product.id, currentQuantity });
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
          {!isLoading ? (
            <button
              onClick={substractQuantity}
              disabled={quantityOfProduct === 0}
              className="btn btn-circle text-xl"
            >
              -
            </button>
          ) : (
            <p>Loading...</p>
          )}
          <p className="text-center">{quantityOfProduct}</p>
          {!isLoading ? (
            <button
              onClick={addQuantity}
              disabled={
                quantityOfProduct === product.quantity || product.quantity === 0
              }
              className="btn btn-circle text-xl"
            >
              +
            </button>
          ) : (
            <p>Loadin...</p>
          )}
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
