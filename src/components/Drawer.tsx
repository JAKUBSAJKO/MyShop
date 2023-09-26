import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "react-query";

import { routes } from "../../routes/routes";
import { updateQuantity } from "../../services/services";
import { useBasketStore } from "../../stories/store";
import { Product, ProductInBasket } from "../../types";
import DrawerCard from "./DrawerCard";

interface DrawerProps {
  products: Product[];
  setBasketInLS: (value: ProductInBasket[] | ((val: ProductInBasket[]) => ProductInBasket[])) => void;
  toggle: () => void;
}

export default function Drawer({ products, setBasketInLS, toggle }: DrawerProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();

  const { mutate, isLoading } = useMutation(updateQuantity, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const basket = useBasketStore((state) => state.basket);
  const removeAllFromBasket = useBasketStore((state) => state.cleanBasket);

  const goToSummary = () => {
    router.push(routes.summary);
  };

  const goToSignIn = () => {
    router.push(routes.login);
  };

  const clearBasket = () => {
    removeAllFromBasket();
    updateQuantityInDB();
    setBasketInLS([]);
  };

  const updateQuantityInDB = async () => {
    const updateProductQuantity = basket.map((product) => {
      const productInDB = products.find((element) => element.id === product.id);
      const currentQuantity = productInDB!.quantity + product.quantity;
      mutate({ productId: product.id, currentQuantity });
    });
  };

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
      <ul className="menu px-8 py-4 w-96 bg-base-100 text-base-content gap-4">
        <div className="mt-4 flex justify-between items-center">
          <h1 className="font-raleway text-white text-4xl pl-0">Koszyk</h1>
          <button className="sm:hidden" onClick={toggle}>
            <IoMdClose className="text-2xl" />
          </button>
        </div>
        <li className="border-2 border-white mx-0 mb-4"></li>
        {basket.map((product) => (
          <DrawerCard key={product.id} product={product} />
        ))}
        {basket.length !== 0 ? (
          <>
            <li>
              <button
                className="bg-orange-500 text-white font-raleway font-bold flex justify-center items-center mt-4 hover:bg-orange-600 hover:scale-105"
                onClick={session?.user ? goToSummary : goToSignIn}
              >
                Podsumowanie
              </button>
            </li>
            <li>
              <button
                className="bg-cherry-700 text-white font-raleway font-bold flex justify-center items-center hover:bg-cherry-800 hover:scale-105 mb-4"
                onClick={clearBasket}
              >
                Wyczyść koszyk
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
}
