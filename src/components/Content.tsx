import Card from "@/components/Card";
import Wrapper from "@/components/Wrapper";

import { Product, ProductInBasket } from "../../types";

interface Content {
  products: Product[];
  basketInLS: ProductInBasket[];
  setBasketInLS: (
    value: ProductInBasket[] | ((val: ProductInBasket[]) => ProductInBasket[])
  ) => void;
}

export default function Content({
  products,
  basketInLS,
  setBasketInLS,
}: Content) {
  return (
    <div className="drawer-content">
      <Wrapper>
        <div className="max-w-5xl mx-auto py-32 flex flex-wrap justify-center items-center gap-12">
          {products?.map((product: Product) => (
            <Card
              key={product.id}
              product={product}
              basketInLS={basketInLS}
              setBasketInLS={setBasketInLS}
            />
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
