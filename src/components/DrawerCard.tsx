import { ProductInBasket } from "../../types";

interface DrawerCardProps {
  product: ProductInBasket;
}

export default function DrawerCard({ product }: DrawerCardProps) {
  return (
    <div
      key={product.id}
      className="w-full h-24 bg-orange-500 rounded-2xl text-white flex items-center"
    >
      <div className="basis-1/3 w-full h-full flex justify-center items-center bg-white rounded-l-2xl">
        <img src={product.image} width={64} />
      </div>
      <div className="basis-2/3 p-4 flex flex-col justify-center">
        <h2 className="font-raleway font-bold text-lg">{product.name}</h2>
        <p className="font-medium">Ilość: {product.quantity}</p>
      </div>
    </div>
  );
}
