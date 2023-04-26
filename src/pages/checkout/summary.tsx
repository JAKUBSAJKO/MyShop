import { loadStripe } from "@stripe/stripe-js";

import { useBasketStore } from "../../../stories/store";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Summary() {
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

  return (
    <div className="w-full h-screen px-40 py-16 flex justify-center items-end gap-8">
      <div className="basis-9/12 w-full h-full  p-8 rounded-3xl text-white">
        <ul className="w-full min-h-full flex flex-wrap justify-center gap-8">
          {basket.map((product) => (
            <div key={product.id} className="w-64 h-36 border-2">
              <p>{product.name}</p>
              <img src={product.image} width={64} />
              <p>Cena: {product.price} zł/szt.</p>
              <p>Ilość: {product.quantity}</p>
            </div>
          ))}
        </ul>
      </div>
      <div className="basis-3/12 w-full h-44  rounded-3xl"></div>

      <button role="link" onClick={goToCheckout}>
        Przejdź do płatności
      </button>
    </div>
  );
}
