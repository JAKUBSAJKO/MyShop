import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

import { routes } from "../../../routes/routes";
import { useBasketStore } from "../../../stories/store";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Summary() {
  const router = useRouter();
  const { data: session } = useSession();

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

  const goToSignIn = () => {
    router.push(routes.login);
  };

  return (
    <div>
      <div>
        <ul>
          {basket.map((product) => (
            <div key={product.id}>
              <p>{product.name}</p>
              <img src={product.image} width={64} />
              <p>Cena: {product.price} zł/szt.</p>
              <p>Ilość: {product.quantity}</p>
            </div>
          ))}
        </ul>
      </div>
      <button role="link" onClick={session?.user ? goToCheckout : goToSignIn}>
        Przejdź do płatności
      </button>
    </div>
  );
}
