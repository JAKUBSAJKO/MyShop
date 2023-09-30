import { Dispatch, SetStateAction } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Product } from "../../types";

interface DeliveryButtonProps {
  products: Product[] | undefined;
  direction: "left" | "right";
  currentProductNumber: number;
  setCurrentProductNumber: Dispatch<SetStateAction<number>>;
  style?: string;
}

export default function DeliveryButton({
  products,
  direction,
  currentProductNumber,
  setCurrentProductNumber,
  style,
}: DeliveryButtonProps) {
  const prevProduct = () => {
    if (currentProductNumber === 0) {
      setCurrentProductNumber(products?.length! - 1);
    } else {
      setCurrentProductNumber((prev) => prev - 1);
    }
  };

  const nextProduct = () => {
    if (currentProductNumber === products?.length! - 1) {
      setCurrentProductNumber(0);
    } else {
      setCurrentProductNumber((prev) => prev + 1);
    }
  };

  return (
    <button
      onClick={direction === "left" ? prevProduct : nextProduct}
      className={`w-16 h-16 bg-gray-800 rounded-lg flex justify-center items-center ${style}`}
    >
      {direction === "left" ? <FaArrowLeft className="text-2xl" /> : <FaArrowRight className="text-2xl" />}
    </button>
  );
}
