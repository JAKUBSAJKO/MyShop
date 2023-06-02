import { useEffect } from "react";
import { useRouter } from "next/router";

import { routes } from "../../../routes/routes";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ProductInBasket } from "../../../types";

export default function Success() {
  const router = useRouter();

  const [basketInLS, setBasketInLS] = useLocalStorage<ProductInBasket[]>(
    "basketLS",
    []
  );

  useEffect(() => {
    setBasketInLS([]);
    setTimeout(() => {
      router.push(routes.home);
    }, 3000);
  }, []);

  return (
    <div>
      <h1>Płatność poszła pomyślnie ❤❤❤</h1>
    </div>
  );
}
