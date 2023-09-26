import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";

import useLocalStorage from "@/hooks/useLocalStorage";
import { routes } from "../../../routes/routes";
import { getProducts, updateQuantity } from "../../../services/services";
import { useBasketStore } from "../../../stories/store";
import { Product, ProductInBasket } from "../../../types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Summary() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const basket = useBasketStore((state) => state.basket);
  const removeFromBasket = useBasketStore((state) => state.removeFromBasket);

  const { data: products } = useQuery("products", getProducts);

  const [basketInLS, setBasketInLS] = useLocalStorage<ProductInBasket[]>("basketLS", []);

  const { mutate, isLoading } = useMutation(updateQuantity, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const goToCheckout = async () => {
    const allProducts = basket.map(({ price_id, quantity }) => ({
      price: price_id,
      quantity,
    }));

    const { id: sessionId } = await fetch("/api/checkout/session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allProducts),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({
      sessionId,
    });
  };

  const removeItem = (product: ProductInBasket) => {
    removeFromBasket(product);
    const productInDB = products.find((element: Product) => element.id === product.id);
    const currentQuantity = productInDB.quantity + product.quantity;
    mutate({ productId: product.id, currentQuantity });
    const removeItemInLS = basketInLS.filter((productInLS) => productInLS.id !== product.id);
    setBasketInLS([...removeItemInLS]);
  };

  const total = basket.reduce(
    (acc, curr) => (curr.quantity > 1 ? curr.price * curr.quantity + acc : curr.price + acc),
    0
  );

  useEffect(() => {
    if (basket.length < 1) {
      router.push(routes.home);
    }
  }, [basket]);

  return (
    <div className="w-full h-screen p-8 flex flex-col justify-center items-center bg-orange-400 lg:flex-row lg:justify-start lg:items-stretch lg:p-16">
      <div className="lg:basis-3/5 flex flex-col text-white gap-6">
        <button className="flex items-center gap-2" onClick={() => router.push(routes.home)}>
          <BiArrowBack />
          <p className="uppercase font-medium">Kontynuuj zakupy</p>
        </button>
        <div className="mb-8 lg:mt-2 lg:mb-0">
          <h1 className="text-4xl">TWÓJ KOSZYK</h1>
          <p>Masz w swoim koszyku {basket.length} rzeczy</p>
        </div>
        <ul className="hidden max-w-xl lg:flex flex-col gap-4 overflow-y-scroll no-scrollbar">
          {basket.map((product) => (
            <li key={product.id} className="h-24 bg-nav-grey-200 py-4 flex items-center rounded-2xl">
              <div className="h-16 px-3 mx-4 bg-white flex justify-center items-center rounded-xl">
                <img src={product.image} alt={product.name} width={48} />
              </div>
              <div className="w-full flex justify-between items-center">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <div className="flex items-center gap-8 mr-8">
                  <div className="flex items-center gap-4">
                    <button className="text-lg font-bold">+</button>
                    <p className="w-6 h-6 bg-white text-nav-grey-200 font-bold rounded-md flex justify-center items-center">
                      {product.quantity}
                    </p>
                    <button className="text-lg font-bold">-</button>
                  </div>
                  <p className="w-12 flex justify-center items-center">{product.price} zł</p>
                  <button onClick={() => removeItem(product)} className="hover:text-trash hover:scale-105">
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:basis-2/5 flex flex-col justify-end">
        <div className="w-80 bg-nav-grey-200 rounded-2xl text-white p-8 flex flex-col gap-6">
          <h3 className="text-xl">Podsumowanie</h3>
          <hr />
          <div className="flex flex-col gap-2">
            <div className="px-2 flex justify-between items-center">
              <p className="text-nav-grey">Produkty</p>
              <p>{total} zł</p>
            </div>
            <div className="px-2 flex justify-between items-center">
              <p className="text-nav-grey">Wysyłka</p>
              <p>0 zł</p>
            </div>
          </div>
          <hr />
          <div className="px-4 flex justify-between items-center">
            <p className="text-xl">Razem</p>
            <p className="text-xl">{total} zł</p>
          </div>
          <button
            role="link"
            onClick={goToCheckout}
            className={`py-3 rounded-lg font-semibold hover:scale-105 ${
              basket.length < 1 ? "bg-gray-400 hover:scale-100" : "bg-orange-500 hover:bg-orange-600"
            }`}
            disabled={basket.length < 1}
          >
            Przejdź do płatności
          </button>
        </div>
      </div>
    </div>
  );
}
