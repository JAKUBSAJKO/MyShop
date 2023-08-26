import { useEffect } from "react";

import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import Link from "next/link";
import { routes } from "../../../routes/routes";
import { ProductInBasket } from "../../../types";

export default function Success() {
  const [basketInLS, setBasketInLS] = useLocalStorage<ProductInBasket[]>("basketLS", []);

  useEffect(() => {
    setBasketInLS([]);
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="font-raleway text-6xl">Dziękujemy za Zakupy!</h1>
      <Image src="/images/delivery.png" alt="" width={360} height={360} />
      <div className="flex flex-col items-center">
        <p className="font-raleway font-semibold">
          Dziękujemy za złożenie zamówienia w naszym sklepie. Jesteśmy zachwyceni, że jesteście naszymi klientami!
        </p>
        <p className="font-raleway font-semibold">
          Twoja paczka jest w drodze do Ciebie, a my dbamy o to, aby dotarła w idealnym stanie.
        </p>
        <p className="font-raleway font-semibold">
          Mamy nadzieję, że nasze produkty spełnią Twoje oczekiwania. Zapraszamy ponownie na naszą stronę w przyszłości!
        </p>
      </div>
      <Link
        href={routes.home}
        className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg mt-5 hover:bg-orange-600 hover:scale-105"
      >
        Powrót do sklepu
      </Link>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-4 text-xs">
        <a href="https://storyset.com/work">Work illustrations by Storyset</a>
      </div>
    </div>
  );
}
