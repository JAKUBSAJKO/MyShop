import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { useBasketStore } from "../../stories/store";
import { routes } from "../../routes/routes";

export default function Drawer() {
  const router = useRouter();
  const { data: session } = useSession();

  const basket = useBasketStore((state) => state.basket);

  const goToSummary = () => {
    router.push(routes.summary);
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
          <button onClick={session?.user ? goToSummary : goToSignIn}>
            Podsumowanie
          </button>
        </li>
      </ul>
    </div>
  );
}
