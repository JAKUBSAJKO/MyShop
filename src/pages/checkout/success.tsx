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
      <h1 className="font-raleway text-2xl md:text-6xl">Dziękujemy za Zakupy!</h1>
      <Image
        src="/images/delivery.png"
        alt=""
        width={360}
        height={360}
        className="w-56 h-56 my-4 md:my-0 md:w-80 md:h-80"
      />
      <div className="max-w-xs flex flex-col items-center text-center px-4 md:max-w-2xl md:px-0 lg:max-w-none lg:text-left">
        <p className="font-raleway font-semibold text-sm md:text-base">
          Dziękujemy za złożenie zamówienia w naszym sklepie. Jesteśmy zachwyceni, że jesteście naszymi klientami!
        </p>
        <p className="font-raleway font-semibold text-sm md:text-base">
          Twoja paczka jest w drodze do Ciebie, a my dbamy o to, aby dotarła w idealnym stanie.
        </p>
        <p className="font-raleway font-semibold text-sm md:text-base">
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
