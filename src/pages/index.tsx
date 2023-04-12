import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { prisma } from "../../server/db/client";
import { Product } from "../../types";
import { useBasketStore } from "../../stories/store";

import Card from "@/components/Card";
import Wrapper from "@/components/Wrapper";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Home({ products }: { products: Product[] }) {
  const basket = useBasketStore((state) => state.basket);

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

  useEffect(() => {
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
        <div className="drawer-content">
          <Wrapper>
            <div className="max-w-5xl mx-auto py-32 flex flex-wrap justify-center items-center gap-4">
              {products.map((product: Product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          </Wrapper>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu p-4 w-96 bg-base-100 text-base-content">
            {basket.map((product) => (
              <div key={product.id}>
                <p>{product.name}</p>
                <img src={product.image} width={64} />
                <p>Cena: {product.price} zł/szt.</p>
                <p>Ilość: {product.quantity}</p>
              </div>
            ))}
            <li>
              <button role="link" onClick={goToCheckout}>
                Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const products = await prisma.product.findMany({
    include: {
      Category: true,
    },
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
