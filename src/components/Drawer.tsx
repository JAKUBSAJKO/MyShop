import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

import { useBasketStore } from "../../stories/store";
import { routes } from "../../routes/routes";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Drawer() {
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
          <button
            role="link"
            onClick={session?.user ? goToCheckout : goToSignIn}
          >
            Checkout
          </button>
        </li>
      </ul>
    </div>
  );
}
