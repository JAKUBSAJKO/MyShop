import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "react-query";

import { Product } from "../../types";
import { useBasketStore } from "../../stories/store";
import { updateQuantity } from "../../services/services";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  const queryClient = useQueryClient();

  const { data: session } = useSession();

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
    <div className="card w-64 bg-base-100 shadow-xl text-white">
      <figure className="bg-white p-8">
        <img src={product.image} alt={product.name} width={144} />
      </figure>
      <div className="card-body flex justify-center items-center">
        <div className="product-badge">
          {product.Category.name.toUpperCase()}
        </div>
        <h2 className="font-raleway font-black text-3xl">{product.name}</h2>
        <h3 className="font-roboto text-base">{product.price} zł / szt.</h3>
        {session ? (
          <>
            <div className="w-32 flex justify-center items-center mt-1 mb-2">
              {!isLoading ? (
                <button
                  onClick={substractQuantity}
                  disabled={quantityOfProduct === 0}
                  className="btn-rounded"
                >
                  -
                </button>
              ) : (
                <button className="btn-rounded flex justify-center items-center ">
                  <ClipLoader size={16} color="#ffffff" />
                </button>
              )}
              <p className="text-center">{quantityOfProduct}</p>
              {!isLoading ? (
                <button
                  onClick={addQuantity}
                  disabled={
                    quantityOfProduct === product.quantity ||
                    product.quantity === 0
                  }
                  className="btn-rounded"
                >
                  +
                </button>
              ) : (
                <button className="btn-rounded flex justify-center items-center ">
                  <ClipLoader size={16} color="#ffffff" />
                </button>
              )}
            </div>
            <button
              onClick={addProductToBasket}
              className="bg-orange-500 font-raleway font-bold text-sm rounded-lg px-4 py-2 hover:bg-orange-600 hover:scale-105"
            >
              Dodaj do koszyka
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
