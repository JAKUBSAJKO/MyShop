import { FormEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import { getProducts, updateQuantity } from "../../../services/services";
import { Product } from "../../../types";

export default function DeliveryContent() {
  const [displayingProduct, setDisplayingProduct] = useState<Product>();
  const [currentProductNumber, setCurrentProductNumber] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { data: products } = useQuery<Product[]>("products", getProducts);

  const queryClient = useQueryClient();

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

  const { mutate, isLoading } = useMutation(updateQuantity, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const enterDelivery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateQuantityInDB();

    setQuantity(0);
  };

  const updateQuantityInDB = async () => {
    if (displayingProduct) {
      const currentQuantity: number = displayingProduct.quantity + quantity;
      mutate({ productId: displayingProduct.id, currentQuantity });
    }
  };

  useEffect(() => {
    if (products !== undefined) {
      setDisplayingProduct(products[currentProductNumber]);
    }
  }, [currentProductNumber, products]);

  return (
    <div className="text-white my-16 flex justify-center">
      <div className="flex flex-col items-center gap-12">
        {isLoading ? (
          <div className="h-[500px] flex justify-center items-center">
            <ClipLoader size={64} color="#ffffff" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-8">
              <button
                onClick={prevProduct}
                className="w-16 h-16 bg-gray-800 rounded-lg flex justify-center items-center"
              >
                <FaArrowLeft className="text-2xl" />
              </button>
              <div className="bg-gray-800 rounded-2xl p-10 flex flex-col items-center gap-6">
                <img
                  src={displayingProduct?.image!}
                  alt={displayingProduct?.name!}
                  width={160}
                  height={160}
                  className="rounded-lg"
                />
                <h1 className="text-2xl font-medium">{displayingProduct?.name}</h1>
                <div className="flex flex-col items-center">
                  <p className="font-raleway uppercase">Stan w magazynie</p>
                  <p className="font-raleway text-xl">{displayingProduct?.quantity}</p>
                </div>
              </div>
              <button
                onClick={nextProduct}
                className="w-16 h-16 bg-gray-800 rounded-lg flex justify-center items-center"
              >
                <FaArrowRight className="text-2xl" />
              </button>
            </div>
            <form onSubmit={enterDelivery} className="flex items-center">
              <div className="flex items-center gap-4">
                <div className="relative w-48 h-20 bg-gray-800 rounded-lg">
                  <input
                    type="number"
                    placeholder="0"
                    min="0"
                    className="w-full h-full px-12 text-center bg-gray-800 rounded-lg text-2xl font-medium placeholder:text-white"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <p className="absolute top-2 left-2">Sztuk</p>
                </div>
                <button className="w-10 h-10 bg-gray-800 rounded-full flex justify-center items-center">
                  <p className="text-2xl">+</p>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
