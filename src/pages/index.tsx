import { useEffect } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Product, ProductInBasket } from "../../types";
import { getProducts } from "../../services/services";
import { useBasketStore } from "../../stories/store";

import Drawer from "@/components/Drawer";
import Content from "@/components/Content";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Home() {
  const { data: products } = useQuery<Product[]>("products", getProducts);

  const addProductsFromLS = useBasketStore(
    (state) => state.addFromLocalStorage
  );

  const [basketInLS, setBasketInLS] = useLocalStorage<ProductInBasket[]>(
    "basketLS",
    []
  );

  useEffect(() => {
    if (basketInLS.length > 0) {
      addProductsFromLS(basketInLS);
    }

    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <Content
          products={products!}
          basketInLS={basketInLS}
          setBasketInLS={setBasketInLS}
        />
        <Drawer products={products!} setBasketInLS={setBasketInLS} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("products", getProducts);

  return {
    props: {
      products: dehydrate(queryClient),
    },
  };
}
